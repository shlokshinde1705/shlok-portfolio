import { Resend } from 'resend';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).send(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log('DEBUG: RESEND_API_KEY exists?', !!apiKey);
    console.log('DEBUG: CONTACT_TO_EMAIL exists?', !!process.env.CONTACT_TO_EMAIL);

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return res.status(500).send(JSON.stringify({ success: false, error: 'Server configuration error' }));
    }
    
    const resend = new Resend(apiKey);

    let { name, email, message, _honeypot } = req.body || {};

    if (_honeypot) {
      return res.status(200).send(JSON.stringify({ success: true, message: 'Message sent successfully.' }));
    }

    if (!name || !email || !message) {
      return res.status(400).send(JSON.stringify({ success: false, error: 'Missing required fields' }));
    }

    name = String(name).trim();
    email = String(email).trim();
    message = String(message).trim();

    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return res.status(400).send(JSON.stringify({ success: false, error: 'Fields cannot be empty' }));
    }

    if (name.length > 100) return res.status(400).send(JSON.stringify({ success: false, error: 'Name too long' }));
    if (email.length > 200) return res.status(400).send(JSON.stringify({ success: false, error: 'Email too long' }));
    if (message.length > 2000) return res.status(400).send(JSON.stringify({ success: false, error: 'Message too long' }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send(JSON.stringify({ success: false, error: 'Please enter a valid email address.' }));
    }
    
    const toEmail = process.env.CONTACT_TO_EMAIL;
    if (!toEmail) {
      console.error('CONTACT_TO_EMAIL is not set in environment variables');
      return res.status(500).send(JSON.stringify({ success: false, error: 'Unable to send your message right now.' }));
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend SDK returned an error:', error);
      return res.status(500).send(JSON.stringify({ success: false, error: 'Unable to send your message right now.' }));
    }

    res.status(200).send(JSON.stringify({ success: true, message: 'Message sent successfully.' }));
  } catch (error) {
    console.error('Resend SDK error:', error.message || error);
    res.status(500).send(JSON.stringify({ success: false, error: 'Unable to send your message right now.' }));
  }
}
