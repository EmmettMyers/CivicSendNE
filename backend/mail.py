import requests
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = {URI}
client = MongoClient(uri, server_api=ServerApi('1'))

def saveEmail(emailInfo):
    db = client["CivicSendNE"]
    col = db["sentEmails"]
    insert = col.insert_one(emailInfo)
    return "Email successfully saved!"

def getEmails(email):
    db = client["CivicSendNE"]
    col = db["sentEmails"]
    emails = list(col.find({"sender.email": email}))
    for email in emails:
        email["_id"] = str(email["_id"])
    return emails

def saveLetter(letterInfo):
    db = client["CivicSendNE"]
    col = db["downloadedLetters"]
    insert = col.insert_one(letterInfo)
    return "Letter successfully saved!"

def getLetters(email):
    db = client["CivicSendNE"]
    col = db["downloadedLetters"]
    letters = list(col.find({"sender.email": email}))
    for letter in letters:
        letter["_id"] = str(letter["_id"])
    return letters

def downloadLetter(letterHTML):
    data = {
        "test": False,
        "source": letterHTML,
        "format": "Letter",
        "media": "print",
        "margin_top": 2,
        "margin_bottom": 2,
        "margin_left": 2,
        "margin_right": 2,
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer {API_KEY}"
    }
    response = requests.post('https://docamatic.com/api/v1/pdf', json=data, headers=headers)
    return response.json()
