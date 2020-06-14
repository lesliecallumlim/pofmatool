from joblib import load
import re
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
import string

def remove_noise(tweet_tokens, stop_words = ()):
    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

def load_models(): 
    #TODO: Repipe - this is due to the different project structure that is ran
    try:
        sentiment = load('./api/models/sentiment.joblib')
        prediction = load('./api/models/log_model.joblib')
    except FileNotFoundError:
        sentiment = load('./models/sentiment.joblib')
        prediction = load('./models/log_model.joblib')
    return sentiment, prediction