from flask import request, jsonify
from api import app
# Custom modules
from api.scraper import scraper
from api.models import Link

# Flask now automatically returns a python dictionary in json strings
@app.route('/api/results')
def get_results():
    # Placeholder for testing
    _result = {   
      "source1": { 
        "platform"  : "Twitter",
        "fake_news" : 30,
        "real_news" : 70,  
      },
      "source2": { 
        "platform"  : "Facebook",
        "fake_news" : 35,
        "real_news" : 65,  
      },
      "source3": { 
        "platform" : "LinkedIn",
        "fake_news" : 20,
        "real_news" : 80,  
      },
    }
    return {'results': _result}

@app.route('/api/evaluate', methods = ['POST'])
def evaluate_link():
    url = request.get_json().get('search')
    url = str(url).strip()
    results = scraper(url)    
    #TODO: Split the database function into a separate function instead
    #TODO: Create a custom try catch block for invalid URLs
    if 'platform' in results: # Check if the key is created by the scraper function
      Link.add_link(url = url, platform = results['platform'], text = results["text"]) 
      print('Do I qualify')
    return jsonify(results = results["text"], url = url)

@app.route('/api/history')
def get_records():
  return jsonify(Link().get_past_records())