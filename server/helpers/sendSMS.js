import twilio from "twilio";
import "dotenv/config";
const accountSid = "AC738b984c278833aad29daabf9c84b676";
const authtoken = "1d3b7048fc6ba3789014b87b6a657f9d";

async function sendSMS(userName, userPhone, token) {
  try {
    const client = new twilio(accountSid, authtoken);
    await client.messages.create({
      body: `Hey ${userName} Thanks for registering with us.Please click the <a href="${process.env.URL}/api/users/verifyphone/${userPhone}/${token}">link</a> to confirm your phone number. ThankYou`,
      from: "+19206575386",
      to: userPhone,
    });
    console.log("SMS sent");
  } catch (error) {
    console.log(error);
  }
}

export default sendSMS;
