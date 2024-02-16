import { EmailTemplate } from "../../_components/email-template.tsx";
import { Resend } from "resend";
const apiKey = process.env.RESEND_API_KEY || ""
const resend = new Resend(apiKey);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["alislami474@gmail.com"],
      subject: "Hello world",
      react: EmailTemplate({ firstName: "John" }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
