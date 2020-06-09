import chromedriver_binary
import re
import time
from selenium import webdriver
import nltk
from nltk.corpus import stopwords

def clean_text(text):

    REPLACE_BY_SPACE_RE = re.compile(r'[/(){}\[\]\|@,;]')
    BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
    nltk.download('stopwords')
    STOPWORDS = set(stopwords.words('english'))

    text = text.lower() # lowercase text
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text. substitute the matched string in REPLACE_BY_SPACE_RE with space.
    text = BAD_SYMBOLS_RE.sub('', text) # remove symbols which are in BAD_SYMBOLS_RE from text. substitute the matched string in BAD_SYMBOLS_RE with nothing. 
    text = text.replace('x', '')
    #    text = re.sub(r'\W+', '', text)
    text = ' '.join(word for word in text.split() if word not in STOPWORDS) # remove stopwors from text
    return text

def scraper(url):
    facebook = 'facebook\.com|fb(?:\.me|\.com)' 
    twitter = 'twitter\.com'
    instagram = 'instagram\.com'
    contents = {}
    #TODO: Use try catch instead, and probably store the regex somewhere
    regex_pattern = fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{facebook}|{instagram}|{twitter})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$'
    if re.search(regex_pattern, url):
        options = webdriver.ChromeOptions()
        # if you want headless
        options.add_argument('headless')         
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        driver = webdriver.Chrome(options = options)
        driver.get(url)
        try: 
            if re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{facebook})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
                elements = driver.find_element_by_xpath('//div[@data-testid="post_message"]').text
                platform = 'Facebook'
            elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{instagram})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
                elements = driver.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/div/li/div/div/div[2]/span').text
                platform = 'Instagram'
            elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{twitter})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
                time.sleep(4) #TODO: Use Wait instead of an arbitary sleep function
                elements = driver.find_element_by_xpath('//*//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div/div/section/div/div/div/div[1]/div/div/div/div/article/div/div[3]/div[1]/div/span').text
                platform = 'Twitter'
            contents["text"] = clean_text(elements)
            contents["platform"] = platform      
        except Exception as e: 
            print(e)
            contents["text"] = 'Invalid platform link!'
        # End session
        finally:
            driver.quit()
    else:
        contents["text"] = 'The URL is currently not supported!'
    return contents

