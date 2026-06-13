"""
Afrivance AI — Chatbot Email Notification Backend
Run with: uvicorn main:app --host 0.0.0.0 --port $PORT
"""

import os
import logging
from datetime import datetime

from dotenv import load_dotenv
load_dotenv()

import resend
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Afrivance AI Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
NOTIFY_TO      = os.getenv("NOTIFY_TO",      "info@afrivance.ai")
FROM_EMAIL     = os.getenv("FROM_EMAIL",      "onboarding@resend.dev")

resend.api_key = RESEND_API_KEY


class LeadPayload(BaseModel):
    name:     str = "Website Visitor"
    email:    EmailStr
    phone:    str
    question: str = "General enquiry"


def send_lead_email(lead: LeadPayload) -> None:
    timestamp = datetime.now().strftime("%d %b %Y at %H:%M")

    html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {{ font-family: Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 20px; }}
    .card {{
      max-width: 560px; margin: 0 auto; background: #ffffff;
      border-radius: 12px; border: 1px solid #e0e8f0; overflow: hidden;
    }}
    .header {{ background: #0A1628; padding: 24px 28px; color: #F0F4F8; font-size: 18px; font-weight: bold; }}
    .header span {{ color: #00C8C8; }}
    .body {{ padding: 28px; }}
    .label {{
      font-size: 11px; font-weight: bold; color: #8899AA;
      text-transform: uppercase; letter-spacing: 0.08em;
      margin-bottom: 4px; margin-top: 18px;
    }}
    .value {{ font-size: 15px; color: #111f3a; font-weight: 500; }}
    .query-box {{
      background: #f0f9f9; border-left: 3px solid #00C8C8;
      padding: 12px 16px; border-radius: 0 8px 8px 0;
      font-size: 14px; color: #111f3a; margin-top: 6px;
    }}
    .reply-btn {{
      display: inline-block; margin-top: 24px; background: #00C8C8;
      color: #0A1628; padding: 12px 24px; border-radius: 8px;
      text-decoration: none; font-weight: bold; font-size: 14px;
    }}
    .footer {{ border-top: 1px solid #e0e8f0; padding: 16px 28px; font-size: 12px; color: #8899AA; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">Afrivance <span>AI</span> — New Website Lead</div>
    <div class="body">
      <p style="color:#8899AA;font-size:13px;margin:0 0 4px;">
        Received: <strong style="color:#111f3a">{timestamp}</strong>
      </p>
      <div class="label">Name</div>
      <div class="value">{lead.name}</div>
      <div class="label">Email</div>
      <div class="value"><a href="mailto:{lead.email}" style="color:#00a8a8;">{lead.email}</a></div>
      <div class="label">Phone</div>
      <div class="value">{lead.phone}</div>
      <div class="label">Their Question / Interest</div>
      <div class="query-box">{lead.question}</div>
      <a href="mailto:{lead.email}" class="reply-btn">Reply to {lead.name} →</a>
    </div>
    <div class="footer">
      This lead came from the Afrivance AI website chatbot. Respond within 1 business day.
    </div>
  </div>
</body>
</html>
"""

    params: resend.Emails.SendParams = {
        "from": f"Afrivance AI <{FROM_EMAIL}>",
        "to": [NOTIFY_TO],
        "reply_to": lead.email,
        "subject": f"New Lead: {lead.name} — {lead.question[:60]}",
        "html": html_body,
    }

    response = resend.Emails.send(params)
    logger.info(f"Email sent via Resend. ID: {response['id']}")


@app.get("/")
def health_check():
    return {"status": "Afrivance AI backend is running"}


@app.get("/debug")
def debug_env():
    return {
        "RESEND_API_KEY": "SET ✓" if RESEND_API_KEY else "NOT SET ← add this in Render",
        "FROM_EMAIL":     FROM_EMAIL,
        "NOTIFY_TO":      NOTIFY_TO,
    }


@app.post("/api/lead")
def receive_lead(lead: LeadPayload):
    logger.info(f"Lead received: {lead.name} | {lead.email} | {lead.phone}")

    if not RESEND_API_KEY:
        logger.error("RESEND_API_KEY is not set")
        raise HTTPException(
            status_code=500,
            detail="RESEND_API_KEY is not configured. Add it in Render environment variables."
        )

    try:
        send_lead_email(lead)
        return {"success": True, "message": f"Lead from {lead.name} sent successfully."}

    except Exception as e:
        logger.error(f"Resend error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")