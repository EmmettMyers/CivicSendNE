from flask import Flask, request, jsonify
from scraper import *
from accounts import *

# Initializing flask app
app = Flask(__name__)

# Retrieving senator data
@app.route('/senatorData')
def senatorDataRoute():
    return jsonify(getParsedSenatorInfo())

# Verifying user location
@app.route('/verifyLocation', methods=['POST'])
def verifyLocationRoute():
    zipCode = request.get_json()
    return jsonify(verifyLocation(zipCode))

# Creating an account
@app.route('/createAccount', methods=['POST'])
def createAccountRoute():
    userInfo = request.get_json()
    return jsonify(createAccount(userInfo))

# Running app
if __name__ == '__main__':
    app.run(debug=True)