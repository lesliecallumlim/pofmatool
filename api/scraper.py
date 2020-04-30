import chromedriver_binary
import re
import time
from selenium import webdriver

def scraper(url):
    url = str(url)
    facebook = 'facebook\.com|fb(?:\.me|\.com)' 
    twitter = 'twitter\.com'
    instagram = 'instagram\.com'
    #TODO: Use try catch instead, and probably store the regex somewhere
    regex_pattern = fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{facebook}|{instagram}|{twitter})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$'
    if re.search(regex_pattern, url):
        options = webdriver.ChromeOptions()
        # if you want headless
        options.add_argument('headless') 
        driver = webdriver.Chrome(options = options)
        driver.get(url)
        if re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{facebook})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
            elements = driver.find_element_by_xpath('//div[@data-testid="post_message"]').text
        elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{instagram})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
            elements = driver.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/article/div[2]/div[1]/ul/div/li/div/div/div[2]/span').text
        elif re.search(fr'^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:{twitter})\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$', url):
            time.sleep(2) #TODO: Use Wait instead of an arbitary sleep function
            elements = driver.find_element_by_xpath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div[1]/div/div/div/section/div/div/div[1]/div/div/div/article/div/div[3]/div[1]/div/span').text
        driver.quit()
        return elements.replace('\n',' ')
    else:
        return 'Invalid URL!'

