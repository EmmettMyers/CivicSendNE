import requests

def createAccount(userInfo) -> str:
    firstName = userInfo['firstName']
    lastName = userInfo['lastName']
    email = userInfo['email']
    password = userInfo['password']
    address = userInfo['address']['line1']
    city = userInfo['address']['city']
    zip = userInfo['address']['zip']
    
    # insert into mongo database

    return "Account successfully created!"