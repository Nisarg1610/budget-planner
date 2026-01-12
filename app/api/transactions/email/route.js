import nodemailer from "nodemailer";
import pool from "@/lib/db";

export async function GET() {
  try {
    // 1️⃣ Fetch all transactions of the month
    const result = await pool.query("SELECT * FROM transactions");
    const transactions = result.rows;

    // 2️⃣ Build email HTML
    const html = `
      <h2>Monthly Budget Statement</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Note</th>
        </tr>
        ${transactions.map(t => `
          <tr>
            <td>${t.date.toISOString().split("T")[0]}</td>
            <td>${t.type}</td>
            <td>${t.title}</td>
            <td>${t.amount}</td>
            <td>${t.note || "-"}</td>
          </tr>
        `).join('')}
      </table>
    `;

    // 3️⃣ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 4️⃣ Send the email
    await transporter.sendMail({
      from: `"Budget Planner" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // or your main email
      subject: "Monthly Budget Statement",
      html
    });

    return new Response(JSON.stringify({ message: "Statement sent!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
