import twilio from "twilio";
const accountSid = "ACcbaaa531f706478b5321ec6e3cb9c324";
const authtoken = "8bb6b90d0f252283ebafd137ac3bc4b5";

async function notification(userName, userPhone, task) {
  try {
    const client = new twilio(accountSid, authtoken);
    await client.messages.create({
      body: `Message! Hey ${userName}, This is a reminder that your task '${task}' is due.`,
      from: "+19206575386",
      to: userPhone,
    });
    console.log("SMS sent");
  } catch (error) {
    console.log(error);
  }
}
export default notification;
