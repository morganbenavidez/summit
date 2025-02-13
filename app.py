from flask import Flask, render_template, send_from_directory, request, jsonify
from flask import redirect, url_for
from summit import *


app = Flask(__name__)


@app.route('/summit/<path:filename>')
def summit_static(filename):
    return send_from_directory('summit', filename)


# EDIT ANYTHING YOU WANT AFTER HERE
# But make sure you return a page='something' when you need to 
# render_template. 
@app.route('/')
def home():
    
    if 'page' not in request.args:
        # Redirect to the URL with the query parameter attached
        return redirect(url_for('home', page='home'))
    
    page = request.args.get('page')
    return render_template("index.html", page=page)


if __name__ == '__main__':
    app.run(debug=True)
