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





@app.route('/ajax_receive', methods=['POST'])
def ajax_receive():
    """
    Receives an AJAX request, identifies the type of data, and forwards it for processing.
    No saving or DB operations occur here.
    """
    # Handle JSON-only request
    if request.is_json:
        data = request.get_json()
        response_type = data.get("response_type", "unknown")
        return ajax_process({"data": data}, response_type)

    # Handle File Uploads (files only, no form data)
    elif len(request.files) > 0 and len(request.form) == 0:
        files_info = {}
        for key in request.files:
            files = request.files.getlist(key)  # Get all files under this key
            files_info[key] = [
                {"filename": file.filename, "content_type": file.content_type, "size": file.content_length}
                for file in files
            ]
        return ajax_process({"files": files_info}, "file_upload")

    # Handle FormData (files + JSON data)
    elif len(request.files) > 0 or len(request.form) > 0:
        form_data = {key: request.form[key] for key in request.form}
        files_info = {}

        for key in request.files:
            files = request.files.getlist(key)  # Get all files under this key
            files_info[key] = [
                {"filename": file.filename, "content_type": file.content_type, "size": file.content_length}
                for file in files
            ]
        return ajax_process({"form_data": form_data, "files": files_info}, "multi_upload")

    return jsonify({"success": False, "error": "Unsupported data type"}), 400


def ajax_process(data, response_type):
    """
    Processes the request based on its type (e.g., saving files, storing data, etc.).
    """

    UPLOAD_FOLDER = "uploads"
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    if response_type == "user_action":
        return jsonify({"success": True, "message": f"User {data['data'].get('username')} performed {data['data'].get('action')}"})

    elif response_type == "file_upload":
        """Save files from a file-only upload"""
        saved_files = {}

        for key, file_info_list in data.get("files", {}).items():
            saved_files[key] = []
            for file_info in file_info_list:
                file = request.files.getlist(key)[file_info_list.index(file_info)]  # Correctly get the file by index
                save_path = os.path.join(UPLOAD_FOLDER, file.filename)

                file.seek(0)  # 🛠️ Reset pointer before reading
                with open(save_path, "wb") as f:
                    f.write(file.read())  # 🏗️ Save the file

                saved_files[key].append(save_path)  # Store file paths

        return jsonify({"success": True, "message": "Files uploaded successfully", "files": saved_files})

    elif response_type == "multi_upload":
        """Save files **and** process form data"""
        saved_files = {}

        for key, file_info_list in data.get("files", {}).items():
            saved_files[key] = []
            for file_info in file_info_list:
                file = request.files.getlist(key)[file_info_list.index(file_info)]  # Correctly get the file by index
                save_path = os.path.join(UPLOAD_FOLDER, file.filename)

                file.seek(0)  # 🛠️ Reset pointer before reading
                with open(save_path, "wb") as f:
                    f.write(file.read())  # 🏗️ Save the file

                saved_files[key].append(save_path)  # Store file paths

        return jsonify({
            "success": True,
            "message": "Form & files processed",
            "form_data": data.get("form_data"),
            "files": saved_files
        })

    return jsonify({"success": False, "error": "Unknown response type"}), 400



if __name__ == '__main__':
    app.run(debug=True)
