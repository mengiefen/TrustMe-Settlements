import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default function notify(req: NextApiRequest, res: NextApiResponse) {
  const accountSid = <string>process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
  const token = <string>process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { message } = req.body;
  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+918452030865",
    })
    .then((message) =>
      res.json({
        success: true,
      }),
    )
    .catch((error) => {
      console.log(error);
      res.json({
        success: false,
      });
    });
}
