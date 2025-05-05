import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from openai import OpenAI
from flask_cors import CORS  # Import CORS

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), 'Server', '.env')
load_dotenv(dotenv_path)

# Initialize OpenAI client, You will need to find the .env file (Which is located in server) to make the API chat bot work
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("Missing OpenAI API key. Please check your .env file.")

client = OpenAI()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route("/get_dino_fact", methods=["GET"])
def get_dino_fact():
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Get Blog idea."}]
        )
        fact = response.choices[0].message.content

        print("OpenAI Response:", fact)  # Debugging
        return jsonify({"fact": fact})
    
    except Exception as e:
        print("Error:", str(e))  # Print any errors
        return jsonify({"fact": "Error retrieving Get Blog idea"}), 500

if __name__ == "__main__":
    app.run(debug=True)
