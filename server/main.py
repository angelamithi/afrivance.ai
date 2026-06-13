"""
Afrivance AI — Chatbot Email Notification Backend
Run with: uvicorn main:app --host 0.0.0.0 --port 8000
"""

import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

from dotenv import load_dotenv
load_dotenv()  # loads .env automatically — no manual export needed

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr


# ─── APP ───────────────────────────────────────────────
app = FastAPI(title="Afrivance AI Chatbot API", version="1.0.0")

# Allow your website domain to call this API.
# Replace with your actual domain once deployed (e.g. "https://afrivance.ai")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:5500",   # Live Server (VS Code)
        "https://afrivance.ai",    # your production domain
        "https://www.afrivance.ai",
    ],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)


# ─── SMTP CONFIG ────────────────────────────────────────
# Set these as environment variables on your server — never hardcode passwords.
# Example (Linux/Mac):  export SMTP_HOST=mail.yourdomain.com
# Example (Windows):    set SMTP_HOST=mail.yourdomain.com
#
# Common SMTP settings by provider:
#
# Zoho Mail:
#   SMTP_HOST = smtp.zoho.com   SMTP_PORT = 587
#
# Hostinger:
#   SMTP_HOST = smtp.hostinger.com   SMTP_PORT = 587
#
# Namecheap (Private Email):
#   SMTP_HOST = mail.privateemail.com   SMTP_PORT = 587
#
# Google Workspace (info@yourdomain.com via Gmail):
#   SMTP_HOST = smtp.gmail.com   SMTP_PORT = 587
#   (enable "App Passwords" in your Google account security settings)
#
# cPanel hosting (most African hosts):
#   SMTP_HOST = mail.afrivance.ai   SMTP_PORT = 587

SMTP_HOST     = os.getenv("SMTP_HOST",     "mail.afrivance.ai")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER     = os.getenv("SMTP_USER",     "info@afrivance.ai")   # your full email address
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")                    # your email password
NOTIFY_TO     = os.getenv("NOTIFY_TO",     "info@afrivance.ai")   # where to receive leads


# ─── REQUEST SCHEMA ─────────────────────────────────────
class LeadPayload(BaseModel):
    name:     str  = "Website Visitor"
    email:    EmailStr
    phone:    str
    question: str  = "General enquiry"


# ─── EMAIL SENDER ───────────────────────────────────────
def send_lead_email(lead: LeadPayload) -> None:
    """Compose and send the lead notification email via SMTP."""

    timestamp = datetime.now().strftime("%d %b %Y at %H:%M")

    # Plain-text fallback
    text_body = f"""
New enquiry from your Afrivance AI website chatbot
Received: {timestamp}

Name:    {lead.name}
Email:   {lead.email}
Phone:   {lead.phone}
Query:   {lead.question}

Reply directly to: {lead.email}
"""

    # HTML email body
    html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {{ font-family: Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 20px; }}
    .card {{
      max-width: 560px; margin: 0 auto;
      background: #ffffff; border-radius: 12px;
      border: 1px solid #e0e8f0; overflow: hidden;
    }}
    .header {{
      background: #0A1628; padding: 24px 28px;
      color: #F0F4F8; font-size: 18px; font-weight: bold;
    }}
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
      display: inline-block; margin-top: 24px;
      background: #00C8C8; color: #0A1628;
      padding: 12px 24px; border-radius: 8px;
      text-decoration: none; font-weight: bold; font-size: 14px;
    }}
    .footer {{
      border-top: 1px solid #e0e8f0; padding: 16px 28px;
      font-size: 12px; color: #8899AA;
    }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      Afrivance <span>AI</span> — New Website Lead
    </div>
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

    # Build the MIME message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"New Lead: {lead.name} — {lead.question[:60]}"
    msg["From"]    = f"Afrivance AI Chatbot <{SMTP_USER}>"
    msg["To"]      = NOTIFY_TO
    msg["Reply-To"] = lead.email

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    # Send via SMTP with STARTTLS (port 587)
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
        server.ehlo()
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, NOTIFY_TO, msg.as_string())


# ─── ROUTES ─────────────────────────────────────────────
@app.get("/")
def health_check():
    return {"status": "Afrivance AI backend is running"}


@app.post("/api/lead")
def receive_lead(lead: LeadPayload):
    """
    Receives lead data from the website chatbot and sends
    a notification email to info@afrivance.ai.
    """
    if not SMTP_PASSWORD:
        raise HTTPException(
            status_code=500,
            detail="SMTP_PASSWORD environment variable is not set on the server."
        )

    try:
        send_lead_email(lead)
        return {
            "success": True,
            "message": f"Lead from {lead.name} sent successfully."
        }
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=500,
            detail="SMTP authentication failed. Check SMTP_USER and SMTP_PASSWORD."
        )
    except smtplib.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")