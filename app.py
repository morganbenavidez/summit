from flask import Flask, render_template, send_from_directory, request, jsonify
from flask import redirect, url_for
from dotenv import load_dotenv
from summit import *
import os

app = Flask(__name__)


# Make sure you return a page='something' when you need to 
# render_template. Most routing should happen on front end
# This is just to start it off and in unique situations you need to route to server
# Almost all interaction with the server should happen through AJAX
@app.route('/')
def home():
    
    if 'page' not in request.args:
        # Redirect to the URL with the query parameter attached
        return redirect(url_for('home', page='home'))
    
    page = request.args.get('page')
    return render_template("index.html", page=page)


@app.route('/login101', methods=['POST'])
def login101():
    print('HERERERERE')
    # Can check against database, etc.
    STORED_EMAIL = "test@test.com"
    STORED_PASSWORD = "YourPassword"

    data = request.json  # Get JSON data from request
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "error": "Email and password required."}), 400

    if email == STORED_EMAIL and password == STORED_PASSWORD:
        return jsonify({"success": True, "message": "Login successful!", "name": "Hello Summit..."})
    else:
        return jsonify({"success": False, "error": "Invalid email or password."}), 401



if __name__ == '__main__':
    app.run(debug=True)
