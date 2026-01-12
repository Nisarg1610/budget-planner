import pool from "../../../lib/db";

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM transactions ORDER BY date DESC");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    client.release();
  }
}
