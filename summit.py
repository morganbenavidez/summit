
import mimetypes
import requests
import random
from dotenv import load_dotenv
import os

load_dotenv()

# Omnexus API Configuration
# Receive your key at https://www.omnexus.ai
# For any organizational needs, passwords, keys
# Database interactions, etc. Use Omnexus API
OMNEXUS_URL = os.getenv("OMNEXUS_URL")
OMNEXUS_KEY = os.getenv("OMNEXUS_KEY")
email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"


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



# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ YOUR FUNCTIONS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$




def handle_ping(job, backend_flag):

    # ✅ Here you can do stuff (access database, api calls, etc) to package json for return
    
    return {"success": True, "job": job, "backend_flag": backend_flag, "message": "Pong!"}, 200

def process_json_1(file, job, backend_flag):

    username = file.get("username", "").strip()
    email = file.get("email", "").strip()

    if not username or not email:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Missing required fields (username, email)."}, 400

    # ✅ Here you can do stuff with your json

    return {"success": True, "job": job, "backend_flag": backend_flag, "message": "JSON processed successfully", "username": username, "email": email}

def process_login(file, job, backend_flag):

    STORED_EMAIL = "test@test.com"
    STORED_PASSWORD = "password"

    password = file.get("password101", "").strip()
    email = file.get("email101", "").strip()

    if not email or not password:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Email and password required."}, 400

    # ✅ Here you can do stuff with your json

    if email == STORED_EMAIL and password == STORED_PASSWORD:
        return {"success": True, "job": job, "backend_flag": backend_flag, "message": "Login successful!", "name": "Hello Summit..."}, 200
    else:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Invalid email or password."}, 401


def process_single_file(file, job, backend_flag):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}
    save_path = os.path.join(UPLOAD_FOLDER, file.filename)

    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": f"Invalid file type: {file.filename}"}, 400

    file.save(save_path)

    # ✅ Here you can do stuff with the uploaded file

    return {"success": True, "job": job, "backend_flag": backend_flag, "message": "File uploaded successfully", "filename": file.filename}


def process_multiple_files(files, job, backend_flag):

    UPLOAD_FOLDER = 'uploads'
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    saved_files = []

    ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

    for f in files:
        file_extension = os.path.splitext(f.filename)[1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            return {"success": False, "job": job, "backend_flag": backend_flag, "error": f"Invalid file type: {file_extension}"}, 400

    for f in files:
        if f.filename == '':
            continue  

        relative_path = request.form.get(f"{f.filename}_path", f.filename)
        save_path = os.path.join(UPLOAD_FOLDER, relative_path)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        f.save(save_path)
        saved_files.append(relative_path)

    if not saved_files:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "No valid files uploaded"}, 400

    # ✅ Here you can do stuff with the uploaded folder

    return {"success": True, "job": job, "backend_flag": backend_flag, "message": "Files uploaded successfully", "filenames": saved_files}


def process_file_and_json(file, data, job, backend_flag):

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Invalid email format."}, 400

    the_response_file = process_single_file(file)

    # ✅ Here you can do stuff with the uploaded file and json

    if the_response_file["success"] == True:
        return {"success": True, "job": job, "backend_flag": backend_flag, "message": "Completed single file and json processing..."}
    else:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Single file and json processing Failed..."}

def process_folder_and_json(files, data, job, backend_flag):
    
    username = data.get("username", "").strip()
    email = data.get("email", "").strip()

    if not username or not email:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Missing required fields (username, email)."}, 400

    if not re.match(email_pattern, email):
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Invalid email format."}, 400

    the_response_folder = process_multiple_files(files)

    # ✅ Here you can do stuff with the uploaded folder and json

    if the_response_folder["success"] == True:
        return {"success": True, "job": job, "backend_flag": backend_flag, "message": "Completed single file and json processing..."}
    else:
        return {"success": False, "job": job, "backend_flag": backend_flag, "error": "Single file and json processing Failed..."}






# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
# $$$$$$$$$$$$$$$$$$$$$$$ SUPPORT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


# Build supporting functions here

def choose_random_integer(start, end):
    return random.randint(start, end)


# Chooses a random item from a list
def choose_random_item(item_list):

    if not item_list:
        return None  # Return None if the list is empty
    return random.choice(item_list)


