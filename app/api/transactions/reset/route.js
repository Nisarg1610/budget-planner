import pool from "../../../../lib/db";

export async function GET() {
  try {
    // Delete or reset all transactions for the previous month
    // Option 1: Delete all transactions (if you only store current month)
    await pool.query("DELETE FROM transactions");

    // Option 2: Keep history, but mark all as archived
    // await pool.query("UPDATE transactions SET archived = true");

    return new Response(JSON.stringify({ message: "Monthly reset done!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to reset" }), { status: 500 });
  }
}
