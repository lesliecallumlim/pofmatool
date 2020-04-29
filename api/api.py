import time
from flask import Flask

app = Flask(__name__)
# Flask now automatically returns a python dictionary in json strings
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/results')
def get_results():
    # Placeholder for testing
    _result = {   "source1" : 
                { "platform" : "Twitter",
                  "fake_news" : 30,
                  "real_news" : 70,  
                },
                "source2" : 
                { "platform" : "Facebook",
                  "fake_news" : 35,
                  "real_news" : 65,  
                },
                "source3" : 
                { "platform" : "LinkedIn",
                  "fake_news" : 20,
                  "real_news" : 80,  
                },
    }
    return {'results' : _result}