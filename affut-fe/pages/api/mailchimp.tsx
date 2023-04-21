const mailchimp = require('@mailchimp/mailchimp_marketing');

export default async function handler(req, res) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_APIKEY,
    server: process.env.MAILCHIMP_SERVER,
  });

  try {
    await mailchimp.lists.addListMember("1a3312273b", {
      email_address: req.body.email,
      status: "subscribed",
    })
  } catch (err) {
    return res.status(400).send({ error: true })
  }
  return res.json({ success: true });
}
