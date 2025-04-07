import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api, Resource
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Resend API Key
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

def create_app():
    # Initialize the Flask app
    app = Flask(__name__)
    CORS(app)
    api = Api(app)

    class SendEmail(Resource):
        def post(self):
            data = request.get_json()
            name = data.get("name")
            email = data.get("email")  # User's email
            subject = data.get("subject")
            message = data.get("message")

            if not name or not email or not subject or not message:
                return {"error": "All fields are required."}, 400

            email_data = {
                "from": "noreply@afrivance.ai",  # Must be a verified email in Resend
                "to": ["info@afrivance.ai"],  # Your inbox
                "reply_to": email,  # This makes it look like the email came from the user
                "subject": subject,
                "html": f"""
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Message:</strong> {message}</p>
                """
            }

            try:
                response = requests.post(
                    "https://api.resend.com/emails",
                    headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
                    json=email_data,
                )

                response_data = response.json()  # Log response for debugging
                print(response_data)

                if response.status_code == 200:
                    return {"message": "Email sent successfully!"}, 200
                else:
                    return {"error": f"Failed to send email: {response_data}"}, 500

            except Exception as e:
                return {"error": f"Server error: {str(e)}"}, 500

    api.add_resource(SendEmail, "/api/send-email")

    return app

# Create the app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
