import { Resend } from 'resend';
import express from 'express';

const router = express.Router();
const resend = new Resend(process.env.VITE_RESEND_API_KEY);

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!process.env.VITE_RESEND_API_KEY) {
        return res.status(500).json({ error: "Resend API key not found" });
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ebukachukwuemeka@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h1>New Message from ${name}</h1>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
    }
});

export default router;
