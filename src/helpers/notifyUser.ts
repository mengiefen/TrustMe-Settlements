const { twilio } = require("twilio");

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID as string;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN as string;
// const client = twilio(accountSid, authToken);
const client = twilio(accountSid, authToken);

export const notifyUser = async () => {
  await client.messages.create({
    body: "Dear Customer, You have new transaction in TrustMe App. Thank you for using our service.",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+251966707266",
  });
};

// const TradeCreatedMessage = (
//   receiveSymbol,
//   receiveAmount,
//   sendSymbol,
//   sendAmount,
//   seller,
// ) => {
//   return `Dear Customer,
//   Your partner with ${seller} has created a trade to exchange
//   ${receiveSymbol} ${receiveAmount} with ${sendSymbol} ${sendAmount}.
//    You can accept or reject this trade by visiting the website.
//    {link to website}. Thank you for using our service.`;
// };

// const TradeCanceledMessage = (
//   receiveSymbol,
//   receiveAmount,
//   sendSymbol,
//   sendAmount,
//   seller,
// ) => {
//   return `Dear Customer,
//   Your partner with ${seller} has canceled a trade to exchange
//   ${receiveSymbol} ${receiveAmount} with ${sendSymbol} ${sendAmount}.
//    You can withdraw your funds by visiting the website.
//    {link to website}.
//    Thank you for using our service.`;
// };
