# test_api.py
import requests

url = "http://localhost:5000/predict"

data = {
    "temperature": 18,
    "humidity": 80,
    "ethylene": 3.2,
    "co2": 620,
    "onion_type": "red"
}

try:
    response = requests.post(url, json=data)
    print("Status Code:", response.status_code)
    print("Response:", response.json())
except requests.exceptions.ConnectionError:
    print("❌ Error: Could not connect to AI server. Is it running?")
except Exception as e:
    print("Error:", str(e))