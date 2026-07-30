import requests


def get_answer(prompt,context):
    response =requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model" : "qwen3:8b",
            "prompt":f"Context:\n{context}\n\nQuestion {prompt}",
            "stream":False
        }
    )
    data =response.json()
    answer = data["response"]
    return answer




def get_title(prompt):
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "qwen3:8b",
            "prompt": f"Summarize this in 3 to 5 words, as a short chat title, no punctuation, no quotes:\n\n{prompt}",
            "stream": False
        }
    )
    data = response.json()
    return data["response"].strip()