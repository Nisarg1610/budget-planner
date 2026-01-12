import pool from "../../../../lib/db";


export async function POST(req) {
  const { type, title, amount, note } = await req.json();
  const client = await pool.connect();

  try {
    const result = await client.query(
      "INSERT INTO transactions (type, title, amount, note) VALUES ($1, $2, $3, $4) RETURNING *",
      [type, title, amount, note]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    client.release();
  }
}
