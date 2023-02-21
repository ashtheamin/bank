from flask import Flask, request

app = Flask(__name__, static_url_path=("/static"))

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/recieveUserLoginForm', methods=['POST'])
def recieveUserLoginForm():
    print(request.form['userName']) #type: ignore
    return app.send_static_file("index.html")