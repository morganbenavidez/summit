from flask import Flask, render_template, send_from_directory, request, jsonify
from flask import redirect, url_for
from dotenv import load_dotenv
from summit import *
import re
import os



app = Flask(__name__)


email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"


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


@app.route('/ajax_receive', methods=['POST'])
def ajax_receive():
    
    #Handles both file and JSON uploads by checking backend_flag.
    
    # Determine if request is JSON or FormData
    if request.content_type.startswith('application/json'):
        try:
            data = request.get_json()
        except:
            return jsonify({"error": "Invalid JSON format"}), 400

    elif request.content_type.startswith('multipart/form-data'):
        # Extract JSON-like fields from FormData
        data = request.form  
    else:
        return jsonify({"error": "Unsupported content type"}), 400

    # Condition 1: Ensure backend_flag is present
    if 'backend_flag' not in data:
        return jsonify({"error": "Missing backend_flag"}), 400
    elif 'job' not in data:
        return jsonify({"error": "Missing job"}), 400

    backend_flag = data['backend_flag']
    job = data['job']
    print('bf: ', backend_flag)
    print('job: ', job)

    if backend_flag == 'single_file':
        print('single file')
        if not request.files or len(request.files) != 1 or 'singleFile' not in request.files:
            return jsonify({"error": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFile']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Forward file to processing function
        return jsonify(ajax_process(file, backend_flag, job))
    
    elif backend_flag == 'multiple_files':
        print('multiple files (folder)')
        # Extract multiple files
        files = request.files.getlist('multiFiles')  
        if not files:
            return jsonify({"error": "No valid files found in request"}), 400
        return jsonify(ajax_process(files, backend_flag, job))
    
    elif backend_flag == 'json_only':

        return jsonify(ajax_process(data, backend_flag, job))

    elif backend_flag == 'single_file_and_json':
        print('single and json')
        if not request.files or len(request.files) != 1 or 'singleFileWithJson' not in request.files:
            return jsonify({"error": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFileWithJson']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Forward file to processing function
        return jsonify(ajax_process(file, backend_flag, job, data))

    elif backend_flag == 'folder_and_json':
        print('folder and json')
        files = request.files.getlist('multiFiles')  # Extract multiple files
        if not files:
            return jsonify({"error": "No valid files found in request"}), 400
        return jsonify(ajax_process(files, backend_flag, job, data))

    # Future conditions can be added here for different backend_flag values
    return jsonify({"error": f"Invalid backend_flag value: {backend_flag}"}), 400



def ajax_process(file, backend_flag, job, data=False):
    print('ajax_process')
    if (backend_flag == 'single_file'):

        # Declare variable
        UPLOAD_FOLDER = ''
        save_path = ''

        if (job == 'firstFile'):
            ALLOWED_EXTENSIONS = {'.png', '.jpg', 'jpeg'}

            UPLOAD_FOLDER = 'uploads'
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            save_path = os.path.join(UPLOAD_FOLDER, file.filename)

            file_extension = os.path.splitext(file.filename)[1].lower()
            if file_extension not in ALLOWED_EXTENSIONS:
                print('no')
                return {"error": f"Invalid file type: {file.filename}"}, 400

        # ADD FUTURE CHECKS HERE - CAN ADD AS MANY AS NEEDED
        elif (job == ''):

            pass

        file.save(save_path)
        return {"message": "File uploaded successfully", "filename": file.filename}

    elif (backend_flag == 'multiple_files'):
        print('multiple_files')
        # Declare variable
        UPLOAD_FOLDER = ''
        saved_files = []

        if (job == 'firstFolder'):

            print('firstFolder')
            ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

            UPLOAD_FOLDER = 'uploads'
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            for f in file:
                file_extension = os.path.splitext(f.filename)[1].lower()
                print('file_extension: ', file_extension)
                if file_extension not in ALLOWED_EXTENSIONS:
                    print('her')
                    return {"error": f"Invalid file type: {file_extension}"}, 400

        # ADD FUTURE CHECKS HERE - CAN ADD AS MANY AS NEEDED
        elif (job == ''):

            pass

        else:
            print('No valid job')
            return {"error": "No valid job was given."}, 400

                
        for f in file:
            if f.filename == '':
                continue  # Skip empty file entries

            # Preserve full folder structure using `webkitRelativePath`
            relative_path = request.form.get(f"{f.filename}_path", f.filename)
            save_path = os.path.join(UPLOAD_FOLDER, relative_path)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)

            f.save(save_path)
            saved_files.append(relative_path)

        if not saved_files:
            return {"error": "No valid files uploaded"}, 400

        return {"message": "Files uploaded successfully", "filenames": saved_files}

    elif backend_flag == 'json_only':

        print("Processing JSON-only request")

        if not isinstance(file, dict):
            return {"error": "Invalid JSON data"}, 400  

        if job == "json_1":
            username = file.get("username", "").strip()
            email = file.get("email", "").strip()
            print('username: ', username)
            print('email: ', email)

            if not username or not email:
                return {"error": "Missing required fields (username, email)."}, 400

            return {"message": "JSON processed successfully", "username": username, "email": email}
        
        elif job == "login101":
            print('log')
            print('file: ', file)
            # Can check against database, etc.
            STORED_EMAIL = "test@test.com"
            STORED_PASSWORD = "YourPassword"

            password = file.get("password101", "").strip()
            email = file.get("email101", "").strip()
            
            print('email: ', email)
            print('password: ', password)

            if not email or not password:
                return {"success": False, "error": "Email and password required."}, 400

            if email == STORED_EMAIL and password == STORED_PASSWORD:
                return {"success": True, "job": job, "message": "Login successful!", "name": "Hello Summit..."}, 200
            else:
                return {"success": False, "job": 'login_failed', "error": "Invalid email or password."}, 401

        # ADD FUTURE CHECKS HERE - CAN ADD AS MANY AS NEEDED
        elif job == '':

            pass  # Future jobs can be handled here

        return {"error": "Invalid job for JSON processing"}, 400

    elif backend_flag == 'single_file_and_json':

        print("Processing single file and JSON request")

        # Declare variable
        UPLOAD_FOLDER = ''
        save_path = ''

        if (job == 'sfj'):

            username = data.get("username", "").strip()
            email = data.get("email", "").strip()

            if not username or not email:
                return {"error": "Missing required fields (username, email)."}, 400

            if not re.match(email_pattern, email):
                return {"error": "Invalid email format."}, 400

            ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}
            UPLOAD_FOLDER = 'uploads'
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)

            file_extension = os.path.splitext(file.filename)[1].lower()
            if file_extension not in ALLOWED_EXTENSIONS:
                return {"error": f"Invalid file type: {file.filename}"}, 400  

            save_path = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(save_path)

            #print('final_me: ', username)
            #print('email: ', email)

            return {
                "message": "File and JSON processed successfully",
                "filename": file.filename,
                "username": username,
                "email": email
            }
        
        # ADD FUTURE CHECKS HERE - CAN ADD AS MANY AS NEEDED
        elif (job == ''):

            pass

    elif (backend_flag == 'folder_and_json'):
        print('folder_and_json')
        # Declare variable
        UPLOAD_FOLDER = ''
        saved_files = []

        if (job == 'fwj'):
            username = data.get("username", "").strip()
            email = data.get("email", "").strip()

            if not username or not email:
                return {"error": "Missing required fields (username, email)."}, 400

            if not re.match(email_pattern, email):
                return {"error": "Invalid email format."}, 400

            ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

            UPLOAD_FOLDER = 'uploads'
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            
            for f in file:
                file_extension = os.path.splitext(f.filename)[1].lower()
                print('file_extension: ', file_extension)
                if file_extension not in ALLOWED_EXTENSIONS:
                    print('her')
                    return {"error": f"Invalid file type: {file_extension}"}, 400 

        # ADD FUTURE CHECKS HERE - CAN ADD AS MANY AS NEEDED
        elif (job == ''):

            pass

        else:
            print('No valid job')
            return {"error": "No valid job was given."}, 400

                
        for f in file:
            # Skip empty file entries
            if f.filename == '':
                continue  

            # Preserve full folder structure using `webkitRelativePath`
            relative_path = request.form.get(f"{f.filename}_path", f.filename)
            save_path = os.path.join(UPLOAD_FOLDER, relative_path)
              # Ensure subfolders exist
            os.makedirs(os.path.dirname(save_path), exist_ok=True)

            f.save(save_path)
            saved_files.append(relative_path)

        if not saved_files:
            return {"error": "No valid files uploaded"}, 400

        return {"message": "Files uploaded successfully", "filenames": saved_files}

    else:
        return {"message": "Ajax processing failed"}



if __name__ == '__main__':
    app.run(debug=True)
