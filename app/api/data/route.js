// ============================================================
// GET  api/data        → return all entries (admin)
// POST api/data        → submit a new entry (employee)
// ============================================================

import { readEntries, appendEntry } from "../../../lib/db";

export async function GET() {
  // ── Return all entries ──────────────────────────────────
  try {
    const entries = readEntries();
    return new Response(JSON.stringify({ ok: true, entries }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[GET api/data]", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to read entries." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request) {
  // ── Add a new entry ─────────────────────────────────────
  const { name, size } = await request.json();

  if (!name || !size) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Missing required fields: name, size.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const entries = readEntries();
  if (entries.some((e) => e.name === name)) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "An entry with this name already exists.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const result = appendEntry({ name, size });
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[POST api/data]", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Failed to save entry." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
