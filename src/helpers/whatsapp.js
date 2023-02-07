require("dotenv").config();
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;

const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    from: "whatsapp:+14155238886",
    body: "Hi, Menge! Thanks for using our application. We are glad to have you on board. https://www.menge.com",

    to: "whatsapp:+251966707266",
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err));
