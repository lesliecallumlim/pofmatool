import chromedriver_binary
import re
import time
from selenium import webdriver
import nltk
from nltk.corpus import stopwords

def clean_text(text):
    REPLACE_BY_SPACE_RE = re.compile(r'[/(){}\[\]\|@,;]')
    BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
    # nltk.download('stopwords')
    STOPWORDS = set(stopwords.words('english'))

    text = text.lower() # lowercase text
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text. substitute the matched string in REPLACE_BY_SPACE_RE with space.
    text = BAD_SYMBOLS_RE.sub('', text) # remove symbols which are in BAD_SYMBOLS_RE from text. substitute the matched string in BAD_SYMBOLS_RE with nothing. 
    text = ' '.join(word for word in text.split() if word not in STOPWORDS) # remove stopwors from text
    return text

def scraper(url):
    #Regex for URLs
    facebook = 'facebook\.com|fb(?:\.me|\.com)' 
    twitter = 'twitter\.com'
    instagram = 'instagram\.com'
    linkedin = 'linkedin\.com'
    contents = {}
    #We only want to capture the URLs from the four platforms
    regex_pattern = fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{facebook}|{instagram}|{twitter}|{linkedin})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$'
    if re.search(regex_pattern, url):
        options = webdriver.ChromeOptions()
        # The scraper runs on selenium headless through chromedriver
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
                time.sleep(4)       
                elements = driver.find_element_by_xpath('/html/body/div[1]/section/main/div/div/article/div[3]/div[1]/ul/div/li/div/div/div[2]/span).text
                platform = 'Instagram'
            elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{twitter})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
                time.sleep(4) #To ensure that all elements are captured proper
                elements = driver.find_element_by_xpath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div/div/section/div/div/div[1]/div/div/article/div/div/div/div[3]/div[1]/div/span').text
                platform = 'Twitter'
            elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{linkedin})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
                time.sleep(4)
                elements = driver.find_element_by_xpath('/html/body/main/div[2]/div/div/p').text
                platform = 'LinkedIn'
            contents["text"] = clean_text(elements)
            contents["platform"] = platform
            contents["is_valid"] = True      
        except Exception as e: 
            contents["text"] = 'Invalid platform link!'
            contents["is_valid"] = False
        # End chromedriver session
        finally:
            driver.quit()
    else:
        contents["text"] = 'This URL is currently not supported!'
    return contents

