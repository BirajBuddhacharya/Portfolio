import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { RESEND_API_KEY, CONTACT_EMAIL } = process.env;

    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
        return res.status(500).json({ error: "Server configuration error" });
    }

    const { message, email } = req.body; // Destructure directly from the body

    if (!message || !email) {
        return res.status(400).json({ error: "Message and email are required" });
    }

    try {
        const resend = new Resend(RESEND_API_KEY);

        await resend.emails.send({
            from: 'WebsiteContact@resend.dev',
            to: CONTACT_EMAIL,
            subject: `Message from ${email}`,
            html: message,
        }); 

        return res.status(200).json({ message: "Thanks for contacting me ;)" });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send email" });
    }
};

export default handler;
