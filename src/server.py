from flask import Flask, request, make_response

app = Flask(__name__, static_url_path=("/static"))

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/setBrowserLoginCookie', methods=['GET', 'POST'])
def setBrowserLoginCookie():
    response = make_response(app.send_static_file("index.html"))
    response.set_cookie('jwt', 'jaydoubleyouteefromserver')
    return response

@app.route('/recieveUserLoginForm', methods=['POST'])
def recieveUserLoginForm():
    print(request.form['email']) #type: ignore
    print(request.form['password']) #type: ignore
    print(request.cookies.get('jwt')) #type: ignore
    return app.send_static_file("index.html")

@app.route('/recieveToken', methods=['POST'])
def recieveToken():
    token = request.cookies.get('jwt') #type: ignore
    return app.send_static_file("index.html")