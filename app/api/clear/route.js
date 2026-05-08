// ============================================================
// DELETE api/data/clear   → wipe all entries (admin only)
// ============================================================

import { deleteAllEntries } from "../../../lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { password } = body || {};

    if (password !== ADMIN_PASSWORD) {
      return Response.json(
        { ok: false, error: "Unauthorised." },
        { status: 401 },
      );
    }

    deleteAllEntries();
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[DELETE api/data/clear]", err);
    return Response.json(
      { ok: false, error: "Failed to clear entries." },
      { status: 500 },
    );
  }
}
