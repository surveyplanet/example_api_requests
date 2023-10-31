import requests
import base64
import sys
import json

API_HOST = 'api.surveyplanet.com'

CLIENT_ID = sys.argv[1]
CLIENT_SECRET = sys.argv[2]

if not CLIENT_ID or not CLIENT_SECRET:
    print('Usage: python script.py <client_id> <client_secret>')
    sys.exit(1)

def get_auth_token():
    AUTH = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': f'Basic {AUTH}',
    }
    data = {
        'grant_type': 'client_credentials'
    }

    response = requests.post(f'https://{API_HOST}/oauth/token', headers=headers, data=data)

    if response.status_code == 200:
        return response.json()['data']['access_token']
    else:
        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")
        raise Exception('Cannot get auth token')

def get_user_data(token):
    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {token}',
    }

    response = requests.get(f'https://{API_HOST}/v1/user', headers=headers)

    if response.status_code == 200:
        return response.json()
    else:

        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")
        raise Exception('Cannot get user data')

try:
    token = get_auth_token()
    user_data = get_user_data(token)
    print(json.dumps(user_data, indent=4))
except Exception as e:
    print(e)