// ============================================================
// Corporate Buyings — JSON file database (server-side only)
// File: data/entries.json
// ============================================================

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "entries.json");

/** Ensure the data directory and file exist. */
function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

/**
 * Read all entries from the JSON file.
 * @returns {Array}
 */
export function readEntries() {
  ensureFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

/**
 * Write entries array to the JSON file (overwrites).
 * @param {Array} entries
 */
export function writeEntries(entries) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf8");
}

/**
 * Append a new entry. Returns { ok, error }.
 * @param {{ name: string, size: string }} payload
 */
export function appendEntry({ name, size }) {
  const entries = readEntries();
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
  writeEntries(entries);
  return { ok: true };
}

/**
 * Delete all entries (admin only).
 */
export function deleteAllEntries() {
  writeEntries([]);
}
