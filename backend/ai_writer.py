import openai
import requests
import json

def generateAIMail(user, prompt):
    line1 = "You are " + user['firstName'] + " " + user['lastName'] + ", a citizen of " + user['address']['city'] + ", Nebraska."
    line2 = " You, as the AI writer, are going to write an email to a Senator from Nebraska as " + user['firstName'] + " " + user['lastName'] + "."
    line3 = " Do not include a subject. Also, make every new line a double html breakline: <br/><br/>. Here is the topic: " + prompt
    totalPrompt = line1 + line2 + line3

    openai.organization = "org-B2VCzC8yPM5DdOCjJC0byQrm"
    openai.api_key = "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"
    openai.Model.list()
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + openai.api_key
    }
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": totalPrompt}],
        "temperature": 0.7,
        "max_tokens": 600
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    output = response.json()
    content = output['choices'][0]['message']['content']
    return content