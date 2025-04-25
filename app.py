from flask import Flask, render_template, send_from_directory, request, jsonify
from flask import redirect, url_for
#from dotenv import load_dotenv
from summit import *
import re
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



# 🌟 This is where you will add logic to handle your 
# 🌟 backend. Think of matching the backend_flag and job 
# 🌟 as routes in vanilla flask. You pass these from the front end
# 🌟 and they are handled here.
def ajax_process(file, backend_flag, job, data=False):
    print('ajax_process')

    match backend_flag:
        # 🌟 
        case 'simple_post':
            match job:
                # ✅
                case 'ping':
                    return handle_ping(backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Unknown job for simple_post"}, 400
        # 🌟
        case 'json_only':
            if not isinstance(file, dict):
                return {"success": False, "backend_flag": backend_flag,"job": job, "message": "Invalid JSON data"}, 400  
            match job:
                # ✅
                case "json_1":
                    return process_json_1(file, backend_flag, job)
                # ✅
                case "login101":
                    return process_login(file, backend_flag, job)
                # ✅
                case "simpleForm102":
                    return process_simple_form(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Invalid job for JSON processing"}, 400
        # 🌟
        case 'single_file':
            match job:
                # ✅
                case 'firstFile':
                    return process_single_file(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Invalid job for single file upload"}, 400
        # 🌟
        case 'single_file_and_json':
            match job:
                # ✅
                case 'testing_single_file_with_json':
                    return process_file_and_json(file, data, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Invalid job for single_file_and_json"}, 400
        # 🌟
        case 'multiple_files':
            match job:
                # ✅
                case 'firstFolder':
                    return process_multiple_files(file, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Invalid job for multiple files"}, 400
        # 🌟
        case 'folder_and_json':
            match job:
                # ✅
                case 'testing_folder_with_json':
                    return process_folder_and_json(file, data, backend_flag, job)

                # ✅ ADD CASES HERE

                # ✅
                case _:
                    return {"success": False, "backend_flag": backend_flag,"job": False, "message": "Invalid job for folder_and_json"}, 400
        # 🌟
        case _:
            return {"success": False, "backend_flag": False, "job": False, "message": "Invalid backend flag"}, 400



# 🌟 DON'T TOUCH THIS
# 🌟 YOU CAN COMMENT OUT PRINT STATEMENTS, but logic 
# 🌟 is needed. You handle your logic for different  
# 🌟 backend_flags and jobs in ajax_process
@app.route('/ajax_receive', methods=['POST'])
def ajax_receive():
    
    #Handles both file and JSON uploads by checking backend_flag.
    print('receive')
    # Determine if request is JSON or FormData
    if request.content_type.startswith('application/json'):
        try:
            data = request.get_json()
        except:
            return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Invalid JSON format"}), 400

    elif request.content_type.startswith('multipart/form-data'):
        # Extract JSON-like fields from FormData
        data = request.form  
    else:
        return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Unsupported content type"}), 400



    # $$$$ UNCOMMENT IF YOU WANT TO USE GOOGLE RECAPTCHA
    # Condition 1: Ensure token is present
    #token = data.get("token")
    #print("token: ", token)

    #if not token or not verify_recaptcha(token):
    #    return jsonify({"success": False, "backend_flag": False, "job": False, "message": "reCAPTCHA validation failed"}), 400
    # $$$$ UNCOMMENT IF YOU DON'T WANT TO USE GOOGLE RECAPTCHA



    # Condition 2: Ensure backend_flag is present
    if 'backend_flag' not in data:
        return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Missing backend_flag"}), 400
    elif 'job' not in data:
        return jsonify({"success": False, "backend_flag": False, "job": False, "message": "Missing job"}), 400

    backend_flag = data['backend_flag']
    job = data['job']
    print('bf: ', backend_flag)
    print('job: ', job)

    if backend_flag == 'simple_post':

        return jsonify(ajax_process(data, backend_flag, job))

    elif backend_flag == 'json_only':

        return jsonify(ajax_process(data, backend_flag, job))

    elif backend_flag == 'single_file':
        print('single file')
        if not request.files or len(request.files) != 1 or 'singleFile' not in request.files:
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFile']

        if file.filename == '':
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No selected file"}), 400

        # Forward file to processing function
        return jsonify(ajax_process(file, backend_flag, job))

    elif backend_flag == 'single_file_and_json':
        print('single and json')
        if not request.files or len(request.files) != 1 or 'singleFileWithJson' not in request.files:
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "Invalid upload: Only one file allowed"}), 400

        file = request.files['singleFileWithJson']

        if file.filename == '':
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No selected file"}), 400

        # Forward file to processing function
        return jsonify(ajax_process(file, backend_flag, job, data))
    
    elif backend_flag == 'multiple_files':
        print('multiple files (folder)')
        # Extract multiple files
        files = request.files.getlist('multiFiles')  
        if not files:
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No valid files found in request"}), 400
        return jsonify(ajax_process(files, backend_flag, job))

    elif backend_flag == 'folder_and_json':
        print('folder and json')
        files = request.files.getlist('multiFiles')  # Extract multiple files
        if not files:
            return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": "No valid files found in request"}), 400
        return jsonify(ajax_process(files, backend_flag, job, data))

    # Future conditions can be added here for different backend_flag values
    return jsonify({"success": False, "backend_flag": backend_flag, "job": job, "message": f"Invalid backend_flag value: {backend_flag}"}), 400




if __name__ == '__main__':
    app.run(debug=True, port=5089)
