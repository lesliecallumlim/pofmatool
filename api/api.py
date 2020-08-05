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

# Flask now automatically returns a python dictionary in json strings
@app.route('/api/results', methods = ['GET'])
def get_results():
    return jsonify(results = Link.get_summarised_records())


@app.route('/api/evaluate', methods = ['POST'])
@limiter.limit("1 per minute")
@jwt_optional 
def evaluate_link():
    url = request.get_json()
    url = str(url.get('search')).strip()
    results = scraper(url)

    results['sentiment_result'] = results['fraud_result'] = '' 
    results['fraud_probab'] = ''
    results['id'] = ''

    current_user = get_jwt_identity()

    if 'platform' in results: # Check if the key is created by the scraper function
      # Sentiment analysis
      # Only load model if it not loaded. 
      if 'sentiment' in locals() or 'sentiment' in globals():
        pass
      else:
        # Load models
        sentiment, log_model = load_models()
      
     #JWT based user details 
      _text = remove_noise(word_tokenize(results['text']))
      results['sentiment_result'] = sentiment.classify(dict([token, True] for token in _text))
      _fraud_result = log_model.predict([results['text']])
      results['fraud_probab'] = max(log_model.predict_proba([results['text']])[0])
      results['fraud_result'] = 'Fake' if _fraud_result[0] == 'fake' else 'Real'

      results['id'] = Link.add_link(url = url, platform = results['platform'], text = results['text'],\
                    sentiment = results['sentiment_result'], fraud = results['fraud_result'],\
                    fraud_probability = results['fraud_probab'], username = current_user).id
    #   results['id'] = link.id
    # print(results.id)
    return jsonify(results = results['text'], url = url, sentiment = results['sentiment_result'],\
                   fraud = results['fraud_result'], fraud_probability = results['fraud_probab'], \
                    id = results['id'])

@app.route('/api/history', methods = ['GET'])
def get_records():
    startPage = int(request.args.get('start'))
    return jsonify(results = Link.get_past_records(start = startPage), page = startPage)

@app.route('/api/trending', methods = ['GET'])
def get_trending():
    return jsonify(Link().get_trending())


@app.route('/api/modifyUser', methods = ['POST'])
@jwt_required
def ban_user():
    current_user = get_jwt_identity()
    data = request.get_json()
    user_to_ban = User().modify_user(username = current_user, target_user = data['targetUser'], modify_type = data['modifyType'])
    if user_to_ban is None:
        return bad_request('Invalid user!')
    ban_unban = 'banned' if user_to_ban.is_banned is True else 'unbanned'
    return jsonify(results = f'{user_to_ban.username} is {ban_unban}!')   

@app.route('/api/provideFeedback', methods = ['POST'])
@jwt_optional
def give_feedback():
    current_user = get_jwt_identity()
    data = request.get_json()
    allowed_feedbacks = ['Neutral', 'Great', 'Poor']
    print(current_user)
    if 'id' not in data or 'feedback_string' not in data:
        return bad_request('Feedback ID or feedback is missing.')
    elif data['feedback_string'] not in allowed_feedbacks:
        return bad_request('Invalid feedback!')
    else:
        feedback = Link().add_feedback(username = current_user, feedback_string = data['feedback_string'], id = data['id'])
        if feedback is None:
            return bad_request('Invalid link / unauthorised - please login to give your feedback!')
        else:
            return jsonify(message = f'Thank you for your feedback. {feedback.url} has been rated.')
    

@app.route('/api/searchRecords', methods = ['GET'])
def get_past_content():
    platform = request.args.get('platform')
    search_string = request.args.get('search_string')
    current_platforms = ['All', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'User']
    if platform is None or search_string is None:
        return bad_request('Invalid input!')
    elif platform not in current_platforms:
        return bad_request('Platform is not supported!')
    results = Link().get_past_content(platform, search_string)
    return jsonify(results)

@app.route('/api/userRecords', methods = ['GET'])
def get_user_records():
    results = User().get_users()
    return jsonify(results)

@app.route('/api/userRecordsUpdate', methods = ['POST'])
def update_user_records():
    new_records = request.get_json()
    User.update_user_records(id = new_records['id'], email = new_records['email'], is_admin = new_records['is_admin'])
    return jsonify(message = "Success!")

@app.route('/api/userRecordsDelete', methods = ['POST'])
def delete_user_records():
    print(request.get_json())
    user_records = request.get_json()
    User.delete_user_records(id = user_records['id'])
    return jsonify(message = "Success!")

@app.route('/api/register', methods = ['POST'])
def create_user():
    data = request.get_json()
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('Must include username, email and password fields.')
    if User.query.filter_by(username=data['username']).first():
        return bad_request('Username has already been taken.')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('Email has been previously registered.')
    User.add_user(username = data['username'], email = data['email'], password = data['password'])
    response = jsonify(message = "User registered!")
    response.status_code = 201
    return response

@app.route('/api/login', methods = ['POST'])
def login():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        return bad_request('Username or password missing.')

    user, token = User.verify_identity(username = data['username'],password = data['password'])

    if user and token is not None:
        response = jsonify(message = f'Welcome {user.username}', token = token)
        response.status_code = 201
        return response
    else:
       return bad_request('Username or password wrong.')

@app.route('/api/submitted', methods = ['GET'])
@jwt_optional
def view_past_records():
    current_user = get_jwt_identity()
    startPage = int(request.args.get('start'))
    past_submissions = Link.get_user_past_records(username = current_user, start = startPage)
    return jsonify(logged_in_as = current_user, past_submissions = past_submissions, page = startPage)