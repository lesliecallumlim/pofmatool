from flask import request, jsonify, make_response
from api import app, limiter
# Custom modules
from api.errors import bad_request 
from api.scraper import scraper
from api.models import Link, User
from api.sentiment import remove_noise, load_models
from nltk.tokenize import word_tokenize
from flask_jwt_extended import (jwt_required, jwt_optional, get_jwt_identity)

# Obviously we don't limit ourselves when in testing
@limiter.request_filter
def ip_whitelist():
    return request.remote_addr == "127.0.0.1"

@app.errorhandler(429)
def ratelimit_handler(e):
    return make_response(jsonify(error=f'Too many searches in a minute! {e.description}.'), 429)

# Auxiliary function to check if users are logged in or not
def get_username_jwt():
    try:
        return get_jwt_identity()['username']
    #Basically if the user is not logged in, we just return a None type.
    except:
        return None

# This endpoint permits us to get the list of records which will be put to the chart for visualisation purposes
# There will not be any parameters required to retrieve the results as it is fairly straightforward
@app.route('/api/results', methods = ['GET'])
def get_results():
    results = Link.get_summarised_records()
    try:
        return make_response(jsonify(results = results), 200)
    except:
        # Note that since there has not been any errors with such a simple function, 
        # we just maintain a global catch-all. And, in the unlikely event that there
        # should was an error, we will then go to our logfile and identify the error.
        # Checking for none for the function is illogical as it is essentially a
        # fetch, which well, fetches all of the records, and records can be empty.
        # The same concept is applied across all functions that involves a simple
        # get function.
        return bad_request('There has been an error, please try again')

# For this endpoint, we only limit users to 1 request per minute to prevent misuse of the 
# system given the huge overheads since the module performs a significant number of operations.

# This endpoint is also essentially the bedrock of the system itself where the two ML algorithms
# are loaded from disk, and applied after having the text content of the link scraped, and subsequently
# performs the CRUD operations. 

# The parameters required are: the search url, and an optional JWT token 
# which permits us to store the user who submitted in our database.
@app.route('/api/evaluate', methods = ['POST'])
@limiter.limit("1 per minute")
@jwt_optional 
def evaluate_link():
    results = None
    url = request.get_json()
    try:
        url = str(url.get('search')).strip()
        if not url: # If the URL in the search parameter is blank
            return bad_request('Please enter a URL!') 
        else: # We otherwise call the function to scrape the URLs
            results = scraper(url)
    except: #If the search parameter is not found, we throw an error
        return bad_request('Please check your parameters!')
    
    if results["is_valid"] is not True:
        return bad_request(results["text"])

     # JWT based user details, we simply assign a default if user is not logged in
     # for this endpoint.
    current_user = get_username_jwt() if get_username_jwt() else 'Guest'


    if 'platform' in results and results["is_valid"]: 
        # Check if the key is created by the scraper function
      # Only load models from disks if it not loaded to keep our overheads minimal.
      # The search in the locals and globals function ensure that the models are
      # only initialised once in the entire session
      if 'sentiment' in locals() or 'sentiment' in globals():
        pass
      else:
        sentiment, log_model = load_models()
      
      # Commence analysis
      try: 
        # Remove noise, and tokenize our text
        _text = remove_noise(word_tokenize(results['text']))
        # Pull sentiment results using the model
        results['sentiment_result'] = sentiment.classify(dict([token, True] for token in _text))
        _fraud_result = log_model.predict([results['text']])
        # This is a binary classification model, but there is a predict_proba function through scikit 
        # learn which permits us to get get the numerical probability of the fake or real news
        results['fraud_probab'] = max(log_model.predict_proba([results['text']])[0])
        results['fraud_result'] = 'Fake' if _fraud_result[0] == 'fake' else 'Real'
        # We then use these results of the scraper and commit it into the DB 
        added_link = Link.add_link(url = url, platform = results['platform'], text = results['text'],\
                                  sentiment = results['sentiment_result'], fraud = results['fraud_result'],\
                                  fraud_probability = results['fraud_probab'], username = current_user)
        return make_response(jsonify(results = results['text'], url = url, sentiment = results['sentiment_result'],\
                                 fraud = results['fraud_result'], fraud_probability = results['fraud_probab'], \
                                 id = added_link.id
        ), 200)
      except Exception as e:
        return bad_request(f'There has been an error evaluating your link, please validate your links again. Error: {e}')


# This basically is a feedback endpoint which permits users to rate the 
# results from the ML algorithm. Now, there are several checks in place to ensure
# that only the user who evaluate the link will be able to provide a feedback. 
# Note that only those who are aware of the provideFeedback endpoint
# will be able to retroactively provide their feedback, while those
# who are using the frontend platform, will only be able to rate the 
# feedback evaluate there and then. 

# We also ensured that those that are logged in can provide feedback.
# This is to prevent users from misusing the feedback system.

# The parameters are as follows: the feedback ID of the link evaluated, feedback_string['Neutral', 'Great', 'Poor']
@app.route('/api/provideFeedback', methods = ['POST'])
@jwt_optional
def give_feedback():
    current_user = get_username_jwt() 
    if current_user is None:
        return bad_request('Please login to provide your feedback!')
    data = request.get_json()
    allowed_feedbacks = ['Neutral', 'Great', 'Poor']
    if 'id' not in data or 'feedback_string' not in data:
        return bad_request('Feedback ID or feedback is missing.')
    elif data['feedback_string'] not in allowed_feedbacks:
        return bad_request('Invalid feedback!')
    else:
        feedback = Link().add_feedback(username = current_user, feedback_string = data['feedback_string'], id = data['id'])
        if feedback is None:
            return bad_request('Invalid feedback ID to feedback!')
        else:
            # Return 201 since CRUD is done
            return make_response(jsonify(message = f'Thank you for your feedback. {feedback.url} has been rated.'), 201) 
    

# This endpoint basically permits us to get all of our past records
# The parameters requred are: the page to start at. Since pagination 
# is implemented through the sqlalchemy module. it is needed.
# We can alternatively also implement a fetch-all pages module 
# but from a design  perspective, perhaps limiting the data 
# would be a more sensible one.
@app.route('/api/history', methods = ['GET'])
def get_records():
    try: 
        startPage = int(request.args.get('start'))
        return make_response(jsonify(results = Link.get_past_records(start = startPage), page = startPage),200)
    except: 
        # We throw an error for when the parameters or results are invalid. Now, we can also create custom messages for
        # many other scenarios, but at a brevity point of view, we've decided to create a global catch-all instead. 
        # For example, it is possible to check if the json input string comprises of the start parameter,
        # or if the Link module returns no results. However, since this is a fairly simplistic read operation,
        # defensive programming is not imperative (no pun intended) in this case. 
        # We can always refer to our logfile if needed.
        return bad_request('Parameters are invalid!')

# Simple read module. No parameters. Only the top 5 results are fetched. 
# Only top 5 results are returned, it is trending after all. There is also
# a global catch all to factor for all other scenarios.
@app.route('/api/trending', methods = ['GET'])
def get_trending():
    try:
        trending = Link().get_trending()
        return make_response(jsonify(results = trending), 200)
    except:
        return bad_request('Parameters are invalid!')

# This is the endpoint which bans users. Only admins are able to do so.
# A JWT token is required to identify the user, and subsequently
# we validate the privileges of the user who will be banning and the
# ID of the user to be banned. If it's valid, we will then set the flag
# is_banned to True and vice versa depending on the nature of the 
# modification. 
# The parameters required are: 
# the JWT token, the target user, and the type of modifcation
@app.route('/api/modifyUser', methods = ['POST'])
@jwt_required
def ban_user():
    current_user = get_jwt_identity()
    data = request.get_json()
    allowed_types = ['ban', 'unban']
    if data['modifyTypes'] in allowed_types:
        user_to_ban = User().modify_user(username = current_user['username'], target_user = data['targetUser'], modify_type = data['modifyType'])
        if user_to_ban is not None:
            ban_unban = 'banned' if user_to_ban.is_banned is True else 'unbanned'
            return make_response(jsonify(results = f'{user_to_ban.username} is {ban_unban}!'), 201) # CRUD
        else:
            return bad_request('Invalid user!')
    else:
        return bad_request('Invalid parameters!')

# This endpoint is basically a search operation of the links submitted in the past
# There are few ways to search, through all platforms, or through the social media sites
# or even user specific. The few parameters are:
# the search string which is mandatory, the platform string which is permitted, otherwise, 
# an error will be thrown if they don't meet these criteria. 
@app.route('/api/searchRecords', methods = ['GET'])
def get_past_content():
    platform = request.args.get('platform')
    search_string = request.args.get('search_string')
    current_platforms = ['All', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'User']
    if platform is None or search_string is None:
        return bad_request('Invalid input!')
    elif platform not in current_platforms:
        return bad_request('Platform is not supported!')
    else:
        results = Link().get_past_content(platform, search_string)
        return make_response(jsonify(results = results), 200)

# This is basically a read operation to get all users. 
# Only admins will be able to view this endpoint as
# they comprises of sensitive user data. 
# Besides the JWT token, no oher parameters are necessitated.
@app.route('/api/userRecords', methods = ['GET'])
@jwt_required
def get_user_records():
    if get_jwt_identity()['is_admin'] == 'admin':
        results = User().get_users()
        if results is not None:
            return make_response(jsonify(results = results), 200)
        else:
            return bad_request('There was an error in the retrieval of database records! Please try again.')
    else:
        return bad_request('Unauthorised!')

# This endpoint updates the records of the users.
# As with the user related endpoints, only those with
# elevated privileges (i.e. admins) will be able to do so.
# The few modifcations which could be done are email, 
# admin privileges. The parameters accepted are the
# two aforementioned parameters, as well as the
# intended user to be modified, and of course, the
# JWT token as headers.
@app.route('/api/userRecordsUpdate', methods = ['POST'])
@jwt_required
def update_user_records():
    new_records = request.get_json()
    if 'id' not in new_records:
        return bad_request('Please select an intended receipent!')
    elif 'email' not in new_records or 'is_admin' not in new_records:
        return bad_request('Please choose a field to update!')
    else: 
        user_to_update = User.update_user_records(id = new_records['id'], email = new_records['email'], is_admin = new_records['is_admin'])

    user_privilege = get_jwt_identity()['is_admin']
    if user_to_update is not None and user_privilege == 'admin':
        response = make_response(jsonify(message = "Success!"), 201)
        return response
    elif user_privilege != 'admin':
        return bad_request('Insufficient privileges!')
    else:
        return bad_request('Invalid user to target!')

# This endpoint deletes the records of the users.
# The only parameter required besides the JWT token are:
# The intended user. 
@app.route('/api/userRecordsDelete', methods = ['POST'])
@jwt_required
def delete_user_records():
    user_records = request.get_json()
    if 'id' not in user_records:
        return bad_request('Please provide an ID!')
    if get_jwt_identity()['is_admin'] == 'admin':
        user_to_delete = User.delete_user_records(id = user_records['id'])
        if User.get_user(id = user_records['id']) is None:
           response = make_response(jsonify(message = "Success!"), 201)
           return response
        else: 
            return bad_request('Invalid user!')
    else:
        return bad_request('Insufficient privileges')

# This is basically a user registration module.
# We basically check for the validity of the 
# credentials wanting to be registered.
# The three fields are: username, password, and email.
# In both frontend and backend, we check for the validity 
# of the emails as well for the input variable. Password
# are hashed in the models module.
@app.route('/api/register', methods = ['POST'])
def create_user():
    data = request.get_json()
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('Must include username, email and password fields.')
    if User.query.filter_by(username=data['username']).first():
        return bad_request('Username has already been taken.')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('Email has been previously registered.')
    if User.check_email(data['email']) is not None:
        User.add_user(username = data['username'], email = data['email'], password = data['password'])
        response = make_response(jsonify(message = "User registered!"), 201)
        return response
    else:
        return bad_request('Invalid email!')

# Login handler, requires JWT token, username, and password,
# returns a JWT token
@app.route('/api/login', methods = ['POST'])
def login():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        return bad_request('Username or password missing.')

    user, token = User.verify_identity(username = data['username'],password = data['password'])

    if user and token is not None:
        response = jsonify(message = f'Welcome {user.username}', token = token)
        response.status_code = 200
        return response
    else:
       return bad_request('Username or password wrong.')

# Basically this returns a list of past submissions.
# Requires a JWT token for it to be displayed. 
# Parameters required are: JWT token, and start page
@app.route('/api/submitted', methods = ['GET'])
@jwt_optional
def view_past_records():
    current_user = get_username_jwt()
    if current_user:
        try:
            startPage = int(request.args.get('start'))
        except: 
            return bad_request("Error, invalid parameters!")
        past_submissions = Link.get_user_past_records(username = current_user, start = startPage)
        return make_response(jsonify(logged_in_as = current_user, past_submissions = past_submissions, page = startPage), 200)
    else:
        return bad_request('Please login to view this module!')