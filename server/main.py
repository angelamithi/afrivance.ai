"""
Afrivance AI — Chatbot Email Notification Backend
Run with: uvicorn main:app --host 0.0.0.0 --port $PORT
"""

import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# ─── LOGGING ───────────────────────────────────────────
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ─── APP ───────────────────────────────────────────────
app = FastAPI(title="Afrivance AI Chatbot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all origins — safe for a public API endpoint
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ─── SMTP CONFIG ────────────────────────────────────────
SMTP_HOST     = os.getenv("SMTP_HOST",     "smtpout.secureserver.net")
SMTP_PORT     = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER     = os.getenv("SMTP_USER",     "info@afrivance.ai")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
NOTIFY_TO     = os.getenv("NOTIFY_TO",     "info@afrivance.ai")


# ─── REQUEST SCHEMA ─────────────────────────────────────
class LeadPayload(BaseModel):
    name:     str = "Website Visitor"
    email:    EmailStr
    phone:    str
    question: str = "General enquiry"


# ─── EMAIL SENDER ───────────────────────────────────────
def send_lead_email(lead: LeadPayload) -> None:
    timestamp = datetime.now().strftime("%d %b %Y at %H:%M")

    text_body = f"""
New enquiry from your Afrivance AI website chatbot
Received: {timestamp}

Name:    {lead.name}
Email:   {lead.email}
Phone:   {lead.phone}
Query:   {lead.question}

Reply directly to: {lead.email}
"""

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

    logger.info(f"Connecting to SMTP: {SMTP_HOST}:{SMTP_PORT} as {SMTP_USER}")

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=15) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SMTP_USER, SMTP_PASSWORD)
        msg = MIMEMultipart("alternative")
        msg["Subject"]  = f"New Lead: {lead.name} — {lead.question[:60]}"
        msg["From"]     = f"Afrivance AI Chatbot <{SMTP_USER}>"
        msg["To"]       = NOTIFY_TO
        msg["Reply-To"] = lead.email
        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))
        server.sendmail(SMTP_USER, NOTIFY_TO, msg.as_string())
        logger.info(f"Email sent successfully to {NOTIFY_TO}")


# ─── ROUTES ─────────────────────────────────────────────
@app.get("/")
def health_check():
    return {"status": "Afrivance AI backend is running"}


@app.get("/debug")
def debug_env():
    """
    Shows which env vars are set (not their values).
    Visit https://afrivance-ai.onrender.com/debug to confirm config.
    Remove this route once everything is working.
    """
    return {
        "SMTP_HOST":     SMTP_HOST,
        "SMTP_PORT":     SMTP_PORT,
        "SMTP_USER":     SMTP_USER,
        "SMTP_PASSWORD": "SET" if SMTP_PASSWORD else "NOT SET ← this is the problem",
        "NOTIFY_TO":     NOTIFY_TO,
    }


@app.post("/api/lead")
def receive_lead(lead: LeadPayload):
    logger.info(f"Lead received: {lead.name} | {lead.email} | {lead.phone}")

    if not SMTP_PASSWORD:
        logger.error("SMTP_PASSWORD is not set")
        raise HTTPException(
            status_code=500,
            detail="SMTP_PASSWORD is not configured on the server. Check Render environment variables."
        )

    try:
        send_lead_email(lead)
        return {"success": True, "message": f"Lead from {lead.name} sent successfully."}

    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"SMTP auth failed: {e}")
        raise HTTPException(status_code=500, detail=f"SMTP authentication failed: {str(e)}")

    except smtplib.SMTPConnectError as e:
        logger.error(f"SMTP connect failed: {e}")
        raise HTTPException(status_code=500, detail=f"Could not connect to SMTP server: {str(e)}")

    except smtplib.SMTPException as e:
        logger.error(f"SMTP error: {e}")
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")

    except Exception as e:
        logger.error(f"Unexpected error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")