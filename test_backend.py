import urllib.request
import json

# Test the backend API
url = "http://localhost:8000/analyze"
data = {
    "posts": [
        "Climate change is critical",
        "Government should reduce taxes",
        "We need healthcare for all"
    ]
}

print("Testing backend API...")
print(f"URL: {url}")
print(f"Data: {json.dumps(data)}")
print()

try:
    req = urllib.request.Request(url, 
                                 data=json.dumps(data).encode('utf-8'),
                                 headers={'Content-Type': 'application/json'},
                                 method='POST')
    with urllib.request.urlopen(req, timeout=10) as response:
        result = json.loads(response.read().decode())
        print(f"Status Code: {response.status}")
        print(f"Response: {json.dumps(result, indent=2)}")
except urllib.error.URLError as e:
    print(f"❌ Error: Could not connect to backend - {e}")
except Exception as e:
    print(f"❌ Error: {e}")

