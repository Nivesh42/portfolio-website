import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const body = await req.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
        return new Response("Missing fields", { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New message from ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
        });

        return Response.json({ success: true });
    } catch (error) {
        return new Response("Email failed", { status: 500 });
    }
}