from flask import Flask, request, jsonify, session
from flask_cors import CORS
import uuid
from scraper import *
from accounts import *
from mail import *
from ai_writer import *

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.secret_key = {KEY}

# Retrieving senator data
@app.route('/getRecipients', methods=['POST'])
def getRecipientsRoute():
    district = request.json['district']
    return jsonify(getRecipients(district))

# Verifying user location
@app.route('/verifyLocation', methods=['POST'])
def verifyLocationRoute():
    zipCode = request.json['zip']
    return jsonify(verifyLocation(zipCode))

# Checking if an account exists
@app.route('/checkAccount', methods=['POST'])
def checkAccountRoute():
    email = request.json['email']
    return jsonify(accountExists(email))

# Creating an account
@app.route('/createAccount', methods=['POST'])
def createAccountRoute():
    userInfo = request.json
    return jsonify(createAccount(userInfo))

# Set account
@app.route('/setAccount', methods=['POST'])
def setAccountRoute():
    userInfo = request.json
    return jsonify(setAccount(userInfo))

# Logging in
@app.route('/login', methods=['POST'])
def loginRoute():
    loginInfo = request.json
    user = login(loginInfo)
    if(user):
        session['user'] = loginInfo
        session_id = str(uuid.uuid4())
        return jsonify({'message': 'Success', 'sessionToken': session_id, 'user': user}), 200
    return jsonify({'message': 'Failure'})

# Save email
@app.route('/saveEmail', methods=['POST'])
def saveEmailRoute():
    emailInfo = request.json
    return jsonify(saveEmail(emailInfo))

# Save letter
@app.route('/saveLetter', methods=['POST'])
def saveLetterRoute():
    letterInfo = request.json
    return jsonify(saveLetter(letterInfo))

# Download letter
@app.route('/downloadLetter', methods=['POST'])
def downloadLetterRoute():
    letterHTML = request.json['letterHTML']
    return jsonify(downloadLetter(letterHTML))

# Get letters downloaded
@app.route('/getLetters', methods=['POST'])
def getLettersRoute():
    email = request.json['email']
    return jsonify(getLetters(email))

# Get emails sent
@app.route('/getEmails', methods=['POST'])
def getEmailsRoute():
    email = request.json['email']
    return jsonify(getEmails(email))

# Generate AI mail
@app.route('/generateAIMail', methods=['POST'])
def generateAIMailRoute():
    user = request.json['user']
    prompt = request.json['text']
    return jsonify(generateAIMail(user, prompt))

# Running app
if __name__ == '__main__':
    app.run(debug=True)
