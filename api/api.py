from flask import request, jsonify
from api import app
# Custom modules
from api.errors import bad_request 
from api.scraper import scraper
from api.models import Link, User
from api.sentiment import remove_noise, load_models
from nltk.tokenize import word_tokenize
from flask_jwt_extended import (jwt_required, jwt_optional, get_jwt_identity)


#app.config['JWT_HEADER_TYPE'] = None


# Flask now automatically returns a python dictionary in json strings
@app.route('/api/results', methods = ['GET'])
def get_results():
    return jsonify(results = Link.get_summarised_records())


@app.route('/api/evaluate', methods = ['POST'])
@jwt_optional #Gave error for Guests trying to search since there is no JWT token generated for them.
def evaluate_link():
    url = request.get_json()
    url = str(url.get('search')).strip()
    results = scraper(url)

    results['sentiment_result'] = results['fraud_result'] = ''
    results['fraud_probab'] = ''

    current_user = get_jwt_identity()

    #TODO: Split the database function into a separate function instead
    #TODO: Create a custom try catch block for invalid URLs
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
      Link.add_link(url = url, platform = results['platform'], text = results['text'],\
                    sentiment = results['sentiment_result'], fraud = results['fraud_result'],\
                    fraud_probability = results['fraud_probab'], username = current_user) 
    
    return jsonify(results = results['text'], url = url, sentiment = results['sentiment_result'],\
                   fraud = results['fraud_result'], fraud_probability = results['fraud_probab'])

@app.route('/api/history', methods = ['GET'])
def get_records():
  return jsonify(Link().get_past_records())

@app.route('/api/trending', methods = ['GET'])
def get_trending():
    return jsonify(Link().get_trending())

@app.route('/api/searchRecords', methods = ['GET'])
def get_past_content():
    platform = request.args.get('platform')
    search_string = request.args.get('search_string')
    current_platforms = ['All', 'Facebook', 'Twitter', 'Instagram', 'User']
    if platform is None or search_string is None:
        return bad_request('Invalid input!')
    elif platform not in current_platforms:
        return bad_request('Platform is not supported!')
    results = Link().get_past_content(platform, search_string)
    return jsonify(results)

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
    print(current_user)
    past_submissions = Link.get_user_past_records(username = current_user)
    return jsonify(logged_in_as = current_user, past_submissions = past_submissions)