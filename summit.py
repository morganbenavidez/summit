
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