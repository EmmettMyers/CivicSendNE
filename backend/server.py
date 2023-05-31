from flask import Flask, request, jsonify, session
from flask_cors import CORS
import uuid
from scraper import *
from accounts import *

# Initializing flask app
app = Flask(__name__)
CORS(app)
app.secret_key = 'd715c8522d9329ab85c58afdc0fcb4a020eeafd158efe6c1'

# Retrieving senator data
@app.route('/senatorData')
def senatorDataRoute():
    return jsonify(getParsedSenatorInfo())

# Verifying user location
@app.route('/verifyLocation', methods=['POST'])
def verifyLocationRoute():
    zipCode = request.get_json()
    return jsonify(verifyLocation(zipCode))

# Checking if an account exists
@app.route('/checkAccount', methods=['POST'])
def checkAccountRoute():
    email = request.get_json()
    return jsonify(accountExists(email))

# Creating an account
@app.route('/createAccount', methods=['POST'])
def createAccountRoute():
    userInfo = request.get_json()
    return jsonify(createAccount(userInfo))

# Logging in
@app.route('/login', methods=['POST'])
def loginRoute():
    loginInfo = request.json
    user = login(loginInfo)
    if(user):
        session['email'] = loginInfo['email']
        session_id = str(uuid.uuid4())
        return jsonify({'message': 'Success', 'sessionToken': session_id, 'user': user}), 200
    return jsonify({'message': 'Failure'})

# Running app
if __name__ == '__main__':
    app.run(debug=True)