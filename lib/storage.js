// ============================================================
// Corporate Buyings — Shared constants (safe to import anywhere)
// All data operations now go through /api routes → lib/db.js
// ============================================================

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL']

/**
 * Return per-size counts from an entries array.
 * @param {Array} entries
 * @returns {Object}
 */
export function getSizeCounts(entries = []) {
  const counts = {}
  SIZES.forEach((s) => (counts[s] = 0))
  entries.forEach((e) => {
    if (counts[e.size] !== undefined) counts[e.size]++
  })
  return counts
}

/**
 * Return the size with the most entries, or null if empty.
 * @param {Array} entries
 * @returns {string|null}
 */
export function getMostPopularSize(entries = []) {
  const counts = getSizeCounts(entries)
  let top = null
  let max = 0
  SIZES.forEach((s) => {
    if (counts[s] > max) { max = counts[s]; top = s }
  })
  return top
}
