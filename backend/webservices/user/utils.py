# -*- coding: utf-8 -*-
"""
Created on Sat Oct 31 19:42:51 2020

@author: Lenovo
"""
# =============================================================================
# from django.core.mail import EmailMessage
# from  django.core.mail import send_mail
# =============================================================================

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import os



class Util:
    
    @staticmethod
    def sendMail(data):
        
        mail_content = str(data['email_body'])
        sender_address = os.environ.get("EMAIL_HOST_USER")
        sender_pass = os.environ.get("EMAIL_HOST_PASSWORD")
        receiver_address = data['to_email']  #define reciever email address
		
        message = MIMEMultipart()
        message['From'] = sender_address
        message['To'] = receiver_address 
        message['Subject'] = 'Email Verification' #email subject was hardcoded here 
        message.attach(MIMEText(mail_content, 'plain'))
        
        #Create SMTP session for sending the mail
        session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
        session.starttls() #enable security
        session.login(sender_address, sender_pass) #login with mail_id and password
        
        text = message.as_string()
        session.sendmail(sender_address, receiver_address, text)
        session.quit()
        
        
 