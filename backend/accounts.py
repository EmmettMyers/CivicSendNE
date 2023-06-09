from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://emmettmyers:dbCS8045@cluster0.bnt1l57.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))

def accountExists(email):
    db = client["CivicSendNE"]
    col = db["accounts"]
    account = col.find_one({"email": email})
    return account is not None

def createAccount(userInfo):
    # Set user district and recipients
    from scraper import findUserDistrict
    district = findUserDistrict(userInfo)
    userInfo["district"] = district
    from scraper import getRecipients
    recipients = getRecipients(district)
    userInfo["recipients"] = recipients
    from scraper import findUserRepresentative
    representative = findUserRepresentative(userInfo)
    userInfo["representative"] = representative
    # Send database user info
    db = client["CivicSendNE"]
    col = db["accounts"]
    insert = col.insert_one(userInfo)
    return "Account successfully created!"

def login(userInfo):
    db = client["CivicSendNE"]
    col = db["accounts"]
    email = userInfo["email"]
    password = userInfo["password"]
    query = {'email': email, 'password': password}
    result = col.find_one(query)
    if result:
        result['_id'] = str(result['_id'])
        return result
    return None