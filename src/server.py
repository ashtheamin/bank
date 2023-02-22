from flask import Flask, request, make_response, jsonify
from database import *

app = Flask(__name__, static_url_path=('/static'))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/recieveUserLoginForm', methods=['POST'])
def recieveUserLoginForm():
    response = make_response(app.send_static_file('index.html'))
    databaseInit()
    token = databaseUserLogin(request.form['email'], request.form['password']) #type: ignore
    if (token == None):
        response.set_cookie('userNotFound', "true")
        return response
    response.set_cookie('jwt', token)
    return response

@app.route('/recieveToken', methods=['POST', 'GET'])
def recieveToken():
    token = request.cookies.get('jwt') #type: ignore
    response = make_response()
    databaseInit()
    exists = databaseTokenValidateExistence(token)
    if exists == True:
        response.set_cookie('jwtValid', 'true')
    else:
        response.set_cookie('jwtValid', 'false')
    return response

@app.route('/recieveUserRegistrationForm', methods=['POST'])
def recieveUserRegistrationForm():
    response = make_response(app.send_static_file('index.html'))
    databaseInit()
    databaseUserNew(request
    .form['name'], request.form['email'] ,request.form['password1']) #type: ignore
    token = databaseUserLogin(request.form['email'], request.form['password1']) #type: ignore
    response.set_cookie('jwt', token)
    return response

@app.route("/fetchUserInformationByToken", methods=['POST', 'GET'])
def fetchUserInformationByToken():
    return jsonify(databaseUserGetByToken(request.cookies.get('jwt'))) #type: ignore