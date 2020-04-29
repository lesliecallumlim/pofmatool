import chromedriver_binary
import re
import time
from selenium import webdriver

def scraper(url):
    url = str(url)
    regex_pattern = '^(?:https?:\/\/)?(?:www\.|m\.|mobile\.|touch\.|mbasic\.)?(?:facebook\.com|fb(?:\.me|\.com))\/(?!$)(?:(?:\w)*#!\/)?(?:pages\/)?(?:photo\.php\?fbid=)?(?:[\w\-]*\/)*?(?:\/)?(?:profile\.php\?id=)?([^\/?&\s]*)(?:\/|&|\?)?.*$'
    if re.search(regex_pattern, url):
        options = webdriver.ChromeOptions()
        # if you want headless
        options.add_argument('headless') 
        driver = webdriver.Chrome(options = options)
        driver.get(url)
        elements = driver.find_element_by_xpath('//div[@data-testid="post_message"]')
        # time.sleep(5) # If the driver closes too early, it will not return proper for some reason
        # driver.quit()
        return elements.text
    else:
        return 'Invalid URL!'

