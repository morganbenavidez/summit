
from dotenv import load_dotenv
from flask import request
import mimetypes
import requests
import random
import os
import re


load_dotenv()



# 🌟 This file is where you will add all your code that does 
# 🌟 actual work. Only handle your routing in app.py


# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ OMNEXUS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


OMNEXUS_URL = os.getenv("OMNEXUS_URL")
OMNEXUS_KEY = os.getenv("OMNEXUS_KEY")
# CREATE YOUR KEY AND STORE PUBLIC in global public_key_app
# Select v3 recaptcha key from Google
# https://www.google.com/recaptcha/admin/create
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')

# Omnexus API Configuration
# Receive your key at https://www.omnexus.ai
# For any organizational needs, passwords, keys
# Database interactions, etc. Use Omnexus API


def omnexus_request(namespace, endpoint, params=None, files=None, method="POST"):
    """
    General function to interact with Omnexus API.

    :param namespace: The namespace ('minio', 'mongo', 'ai').
    :param endpoint: The specific endpoint within the namespace.
    :param params: Dictionary of parameters for the request.
    :param files: Dictionary or list of files to upload (for MinIO actions).
    :param method: HTTP method ('POST' only).
    :return: Dictionary with API response.
    """

    headers = {"Content-Type": "application/json"}
    
    # Base data payload
    data = {
        "api_key": OMNEXUS_KEY,
        "namespace": namespace,
        "endpoint": endpoint,
        "params": params or {}
    }

    try:
        # If files are included, send as multipart/form-data
        if files:
            response = requests.post(OMNEXUS_URL, files=files, data=data)
        else:
            response = requests.post(OMNEXUS_URL, json=data)

        # Attempt to parse JSON response
        return response.json()
    
    except requests.exceptions.JSONDecodeError:
        return {"error": "Invalid JSON response", "response_text": response.text}
    
    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}


def verify_recaptcha(token):
    # Verify reCAPTCHA token with Google
    print('verify_recaptcha')
    recaptcha_url = "https://www.google.com/recaptcha/api/siteverify"
    response = requests.post(recaptcha_url, data={
        "secret": RECAPTCHA_SECRET_KEY,
        "response": token
    })
    result = response.json()
    print('verify_recaptcha: ', result.get("success"))
    return result.get("success", False)


# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


# 🌟 Make sure all function responses are packaged in the following format:
# 🌟 {"success": True/False, "backend_flag": backend_flag, "job": job, "message": "Your message", "additional_data": "Add as many as you need"}, 200/300/400/etc.
# 🌟 This makes it easier to integrate with full communication pipeline.


email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"


def handle_ping(backend_flag, job):

    # ✅ Here you can do stuff (access database, api calls, etc) to package json for return
    
    return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Pong!"}, 200

def process_json_1(file, backend_flag, job):

    username = file.get("username", "").strip()
    email = file.get("email", "").strip()

    if not username or not email:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    # ✅ Here you can do stuff with your json

    return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "JSON processed successfully", "username": username, "email": email}, 200

def process_login(file, backend_flag, job):

    STORED_EMAIL = "test@test.com"
    STORED_PASSWORD = "password"

    password = file.get("password101", "").strip()
    email = file.get("email101", "").strip()

    if not email or not password:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Email and password required."}, 400

    # ✅ Here you can do stuff with your json

    if email == STORED_EMAIL and password == STORED_PASSWORD:
        return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Login successful!", "name": "Hello Summit..."}, 200
    else:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email or password."}, 401


def process_simple_form(file, backend_flag, job):

    the_text = file.get("text102", "").strip()
    email = file.get("email102", "").strip()
    the_number = file.get("number102", "").strip()
    the_textarea = file.get("textarea102", "").strip()
    the_select = file.get("select102", "").strip()
    the_radio = file.get("radio102", "").strip()
    the_checkbox = file.get("checkbox102", "").strip()
    print(the_text)

    return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Simple Form Submission successful!", "name": the_text}, 200




def process_single_file(file, backend_flag, job):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)

    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": f"Invalid file type: {file.filename}"}, 400

    file.save(save_path)

    # ✅ Here you can do stuff with the uploaded file

    return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "File uploaded successfully", "filename": file.filename}, 200


def process_multiple_files(files, backend_flag, job):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    saved_files = []

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

    for f in files:
        file_extension = os.path.splitext(f.filename)[1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            return {"success": False, "backend_flag": backend_flag, "job": job,  "message": f"Invalid file type: {file_extension}"}, 400

    for f in files:
        if f.filename == '':
            continue  

        relative_path = request.form.get(f"{f.filename}_path", f.filename)
        save_path = os.path.join(UPLOAD_FOLDER, relative_path)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        f.save(save_path)
        saved_files.append(relative_path)

    if not saved_files:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "No valid files uploaded"}, 400

    # ✅ Here you can do stuff with the uploaded folder

    return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Files uploaded successfully", "filenames": saved_files}, 200


def process_file_and_json(file, data, backend_flag, job):

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email format."}, 400

    the_response_file = process_single_file(file)

    # ✅ Here you can do stuff with the uploaded file and json

    if the_response_file["success"] == True:
        return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Completed single file and json processing..."}, 200
    else:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Single file and json processing Failed..."}, 400

def process_folder_and_json(files, data, backend_flag, job):
    
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Invalid email format."}, 400

    the_response_folder = process_multiple_files(files)

    # ✅ Here you can do stuff with the uploaded folder and json

    if the_response_folder["success"] == True:
        return {"success": True, "backend_flag": backend_flag, "job": job,  "message": "Completed single file and json processing..."}, 200
    else:
        return {"success": False, "backend_flag": backend_flag, "job": job,  "message": "Single file and json processing Failed..."}, 400


# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


# Build supporting functions here

# Choose a random integer between two points
def choose_random_integer(start, end):
    return random.randint(start, end)


# Chooses a random item from a list
def choose_random_item(item_list):

    if not item_list:
        return None  # Return None if the list is empty
    return random.choice(item_list)


