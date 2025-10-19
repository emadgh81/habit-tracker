import cron from "node-cron";
import nodemailer from "nodemailer";
import pool from "../config/db";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const startReminders = () => {

  cron.schedule("0 9 * * *", async () => {
    console.log("Running daily reminder task...");

    const [users] = await pool.query("SELECT id, email FROM users");

    for (const user of users as any[]) {
      const [habits] = await pool.query(
        "SELECT title FROM habits WHERE user_id = ?",
        [user.id]
      );

      if ((habits as any[]).length > 0) {
        const habitList = (habits as any[]).map((h) => `• ${h.title}`).join("\n");

        await transporter.sendMail({
          from: '"Habit Tracker" <no-reply@habitapp.com>',
          to: user.email,
          subject: "remiderrrr",
          text: `just do it :\n${habitList}`,
        });
      }
    }
  });
};