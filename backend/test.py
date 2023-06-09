import requests

data = {
    "test": True,
    "source": "https://news.ycombinator.com",
    "format": "Letter",
    "media": "print",
    "margin_top": 2,
    "margin_bottom": 2
}
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 3f3Sai58U8WmUuwFTqOXNMlETY08D7jOAud43Wuh"
}
response = requests.post('https://docamatic.com/api/v1/pdf', json=data, headers=headers)

print(response.json())
