import os
from dotenv import load_dotenv
from flask import Flask, request
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv()
app = Flask(__name__)

@app.route("/")
def inicio():
    test = os.environ.get("Test")
    return test

@app.route("/sms")
def sms():
    try:
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("telefono")

        message = client.messages \
                        .create(
                            body=contenido,
                            from_='+17629943853',
                            to='+57'+destino
                        )

        print(message.sid)
        return "Enviado correctamente"
    except Exception as e:
        print(e)

@app.route("/email")
def email():
    destino = request.args.get("destino")
    asunto = request.args.get("asunto")
    contenido = request.args.get("contenido")

    message = Mail(
        from_email='estefania.perez.0110@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=contenido)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo electrónico enviado."
    except Exception as e:
        print(e)
        return "Error enviando el mensaje."

if __name__ =='__main__':
    app.run(debug=1)