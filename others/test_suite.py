
import requests
import random



api_url = 'https://pofma.me/api'


# To test if the history page is working proper
pages = []
i = 0
while True:
    i = i + 1
    page_content = requests.get(api_url + f'/history?start={i}').json()
    if page_content['results'] == []:
        break
    else:
        pages.append(page_content['page'])


print(f'Total number of pages: {max(pages)}')
page_content = requests.get(api_url + f'/history?start={max(pages)+1}').json()['results']
print(f'Content at {max(pages)+1}: {page_content}')
page_content = requests.get(api_url + f'/history?start={max(pages)}').json()['results']
print(f'Content at {max(pages)}: {page_content}')




# If parameters are empty
page_content = requests.get(api_url + f'/history')
page_content




# To test if the registration page is working proper
print('Test for username:')
rand_number = random.randint(1, 1000)
userName = f'test{rand_number}'



rand_number = random.randint(1, 1000)
params = {"username" : userName, "password": "123456", "email" : f'{userName}{rand_number}@gmail.com'}
request = requests.post(api_url + f'/register', json = params)


print('Success case:')
print(f'{request}{request.json()}')



print('If we send again the same request with the same params again:')
rand_number = random.randint(1, 1000)
params = {"username" : userName, "password": "123456", "email" : f'{userName}{rand_number}@gmail.com'}
request = requests.post(api_url + f'/register', json = params)
print(f'{request}{request.json()}')



print('Test for email:')
params = {"username" : f'{userName}{rand_number}{rand_number}', 
          "password": "123456", "email" : f'{userName}{rand_number}@gmail.com'}
request = requests.post(api_url + f'/register', json = params)


print('Success case:')
print(f'{request}{request.json()}')



print('If we send again the same request with the same params again:')
rand_number2 = random.randint(1, 1000)
params = {"username" : f'{userName}{rand_number2}', "password": "123456", "email" : f'{userName}{rand_number}@gmail.com'}
request = requests.post(api_url + f'/register', json = params)
print(f'{request}{request.json()}')



print('If we send a request with invalid email:')
rand_number2 = random.randint(1, 1000)
params = {"username" : f'{userName}{rand_number2}{rand_number2}',           "password": "123456", "email" : f'{userName}{rand_number}gmail.com'}
request = requests.post(api_url + f'/register', json = params)
print(f'{request}{request.json()}')



print('If parameters are missing / invalid')
params = {"username" : f'{userName}{rand_number2}', "password": "123456"}
request = requests.post(api_url + f'/register', json = params)
print(f'{request}{request.json()}')




# Login module
print('Test for login using the same username and password generated earlier (success):')
params = {"username" : f'callum', "password": "callum"}
request = requests.post(api_url + f'/login', json = params)
print(f'{request}{request.json()}')




print('Test for login using wrong password (fail):')
params = {"username" : f'{userName}', "password": "1234567"}
request = requests.post(api_url + f'/login', json = params)
print(f'{request}{request.json()}')



print('Test for login with empty parameters (fail):')
params = {}
request = requests.post(api_url + f'/login', json = params)
print(f'{request}{request.json()}')


# History count of past records (rumour / non-rumour)
print('History count of past records (rumour / non-rumour):')
request = requests.get(api_url + f'/results')
print(f'{request}{request.json()}')




# History count of past records (rumour / non-rumour)
print('Actual link evaluation:')
links = [
        'https://www.facebook.com/UOW/posts/3226609850696385', 
         'https://twitter.com/elonmusk/status/1256239815256797184',
         'https://www.linkedin.com/posts/russell-w-tan_rightbyyou-thankyou-team-activity-6697519065759670272-SUxp/',
         'https://google.com/']
statuses = []
responses = []



for link in links:
    params = {"search" : link}
    request = requests.post(api_url + f'/evaluate', json = params)
    statuses.append(f'{request.json()}')
    responses.append(f'{request}')

print(statuses)
print(responses)
print(f'As we can see, link 5: {links[3]} returns a "{statuses[3]}{responses[3]}" error as the platform is not supported.')




print('Using an empty string:')
request = requests.post(api_url + f'/evaluate', json = {})
print(f'{request}, {request.text}')



print('Using a platform approved but there is no direct link to the post:')
params = {"search" : "https://facebook.com/"}
request = requests.post(api_url + f'/evaluate', json = params)
# print(request.json()['results'])
print(f'{request}{request.json()}')



# Check if bearer token is working
params = {"username" : f'{userName}', "password": "123456"}
request = requests.post(api_url + f'/login', json = params).json()
print(f'{request}')
token = request['token']




headers = {'Authorization': f'Bearer {token}'}
params = {"search" : "https://twitter.com/elonmusk/status/1256239815256797184"}
print('We evaluate the link with our bearer token first.')
request = requests.post(api_url + f'/evaluate', json = params, headers = headers)




#Then we check the submitted API if see our records are reflected using our jwt token
headers = {'Authorization': f'Bearer {token}'}
page_content = requests.get(api_url + f'/submitted?start=1', json = params, headers = headers).json()




print('As reflected:')
print(page_content['past_submissions'][0])




print('If token is invalid / expired')
headers = {'Authorization': f'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.2yJpYXQiOjE1OTY0MzMxNTIsIm5iZiI6MTU5NjQzMzE1MiwianRpIjoiM2MxYTljZDktNTM4Yi00ZWQ1LWE3YTItMWVlMTUyMjdiNjY1IiwiZXhwIjoxNTk2NDM0MDUyLCJpZGVudGl0eSI6InRlc3QyNjEiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.Y5ikqdOenDD32_wfcSaCuMHRQBup4OLF9nfL2fU-FMA'}
page_content = requests.get(api_url + f'/submitted?start=1', json = params, headers = headers)
print(f'{page_content}, {page_content.json()}')



print('If token is missing')
headers = {'Authorization': f'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY0MzMxNTIsIm5iZiI6MTU5NjQzMzE1MiwianRpIjoiM2MxYTljZDktNTM4Yi00ZWQ1LWE3YTItMWVlMTUyMjdiNjY1IiwiZXhwIjoxNTk2NDM0MDUyLCJpZGVudGl0eSI6InRlc3QyNjEiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.Y5ikqdOenDD32_wfcSaCuMHRQBup4OLF9nfL2fU-FMA'}
page_content = requests.get(api_url + f'/submitted?start=1', json = params).json()
print(page_content)


#Search functionality
#If platforms are supported
platforms = ['All', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'User', 'Other']
list_without_search_string = []
error = []
for platform in platforms:
    page_content = requests.get(api_url + f'/searchRecords?platform={platform}&search_string=').json() 
    if 'error' in page_content:
        error.append(f'{page_content} Platform: {platform}')
    else:
        list_without_search_string.append(page_content)
   



print('Returns all search strings in the various platforms')
print(list_without_search_string)
print('Identify for errors')
print(error)
print('As we can see, the "Other" platform is not supported.')




print('If there are no query parameters in the URL')
page_content = requests.get(api_url + f'/searchRecords') 
print(f'{page_content}{page_content.json()}')




# Check if bearer token is working
params = {"username" : f'callum1', "password": "callum"}
request = requests.post(api_url + f'/login', json = params).json()
print(f'{request}')
headers = {'Authorization': f'Bearer {token}'}
token = request['token']





page_content = requests.get(api_url + f'/submitted?start=1', json = params, headers = headers).json()
print(page_content["past_submissions"][0])





# Post valid feedback
params = { "feedback_string" : "Neutral", "id" : 50 }
page_content = requests.post(api_url + f'/provideFeedback', json = params, headers = headers)





print(page_content.json())
print(page_content)



# Post invalid feedback
params = { "feedback_string" : "abc", "id" : 50 }
page_content = requests.post(api_url + f'/provideFeedback', json = params, headers = headers)
print(page_content.json())
print(page_content)



# Post invalid feedback with missing parameters
params = { "feedback_string" : "abc", }
page_content = requests.post(api_url + f'/provideFeedback', json = params, headers = headers)
print(page_content.json())
print(page_content)





# Post valid feedback.
params = { "feedback_string" : "Neutral", "id": 50}
page_content = requests.post(api_url + f'/provideFeedback', json = params, headers = headers)
print(page_content.json())
print(page_content)




#Check if trending page works
page_content = requests.get(api_url + f'/trending', json = params, headers = headers)
print(page_content.json())
print(page_content)





#Check if Admin Panel is indeed role-based authorization (Admins)
#View Records - Success
#Token of a user with 'admin' rights 
params = {"username" : f'callum1', "password": "callum"}
request = requests.post(api_url + f'/login', json = params).json()
token = request['token']
admin_headers = {'Authorization': f'Bearer {token}'}
page_content = requests.get(api_url + f'/userRecords', headers = admin_headers).json()
# We then retrive the records
print(page_content)


#Check if Admin Panel is indeed role-based authorization (Admins)
#View Records - Fail
#Token of a user without 'admin' rights
params = {"username" : f'test821', "password": "123456"}
request = requests.post(api_url + f'/login', json = params).json()
token = request['token']
user_headers = {'Authorization': f'Bearer {token}'}
page_content = requests.get(api_url + f'/userRecords', headers = user_headers).json()
print(page_content)


#Check if Admin Panel update works for authorized users (Admins)
page_content = requests.get(api_url + f'/userRecords', headers = admin_headers).json()
# We then retrive the records of the latest records, and modify the privileges
to_modify = page_content["results"][0]
print(to_modify["username"])
#Update Records - Success
#Token of a user with 'admin' rights 
new_data = {"email":"callumleslielim@gmail.com",
            "id":to_modify["id"],
            "is_admin":True,
            "is_banned":False,
            "username":str(to_modify["username"])}
page_content = requests.post(api_url + f'/userRecordsUpdate', json = new_data, headers = admin_headers).json()
print(page_content)


#Check if Admin Panel update works for authorized users (Admins)
#Update Records - Without email or is_admin field in new_data - Fail
#Token of a user with 'admin' rights 
headers = {'Authorization': f'Bearer {token}'}
new_data = {"date_registered":"Tue, 04 Aug 2020 00:00:00 GMT","email":"callumleslielim@gmail.com","id":1,
            "is_banned":False,
            "password_hash":"pbkdf2:sha256:150000$yLMJd8A0$18db26e5a143cd104e640b934334ce7a61438c30fdd4245ce42daf22d6554675",
            "username":"callum"}
page_content = requests.post(api_url + f'/userRecordsUpdate', json = new_data, headers = headers).json()
print(page_content) 



#Check if Admin Panel update works for authorized users (Admins)
#Update Records - Without admin rights - Fail
#Token of a user without 'admin' rights 
new_data = {"email":"callumleslielim@gmail.com",
            "id":to_modify["id"],
            "is_admin":True,
            "is_banned":False,
            "username":str(to_modify["username"])}
page_content = requests.post(api_url + f'/userRecordsUpdate', json = new_data, headers = user_headers).json()
print(page_content)


#Check if Admin Panel delete works for authorized users (Admins)
#Delete Records - Success
#Token of a user with 'admin' rights 
print(to_modify["id"])
old_data = {"id": to_modify["id"]}
page_content = requests.post(api_url + f'/userRecordsDelete', json = old_data, headers = admin_headers).json()
print(page_content)

#Check if Admin Panel delete works for authorized users (Admins)
#Delete Records - User being deleted does not exist - Fail
#Token of a user with 'admin' rights
old_data = {"id": to_modify["id"]}
page_content = requests.post(api_url + f'/userRecordsDelete', json = old_data, headers = user_headers).json()
print(page_content)
input()



