import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const fromEmail = process.env.FROM_EMAIL!;

export async function POST(req: NextRequest) {
  const { email, subject, message }: { email: string; subject: string; message: string } = await req.json();
  console.log(email, subject, message);
  
  const htmlContent = `
    <h1>${subject}</h1>
    <p>Thank you for contacting me!</p>
    <p>New message sent! :</p>
    <p>${message}</p>
  `;
  
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, email],
      subject: subject,
      html: htmlContent,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
