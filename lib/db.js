// ============================================================
// Corporate Buyings — Vercel KV database
// ============================================================

import { kv } from "@vercel/kv";

/**
 * Read all entries
 */
export async function readEntries() {
  const entries = await kv.get("entries");
  return entries || [];
}

/**
 * Overwrite all entries
 */
export async function writeEntries(entries) {
  await kv.set("entries", entries);
}

/**
 * Append a new entry
 */
export async function appendEntry({ name, size }) {
  const entries = await readEntries();

  entries.push({
    name: name.trim(),
    size,
    submittedAt: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  await writeEntries(entries);

  return { ok: true };
}

/**
 * Delete all entries
 */
export async function deleteAllEntries() {
  await writeEntries([]);
}