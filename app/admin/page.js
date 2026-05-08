"use client";
import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Alert from "../../components/Alert";
import { getSizeCounts, getMostPopularSize, SIZES } from "../../lib/storage";
import * as XLSX from "xlsx";

// ── Stats cards ───────────────────────────────────────────────────────────────
function StatsRow({ entries }) {
  const counts = getSizeCounts(entries);
  const popular = getMostPopularSize(entries);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{entries.length}</div>
        <div className="stat-label">Total Entries</div>
      </div>
      <div className="stat-card">
        <div className={`stat-number${popular ? " red" : ""}`}>
          {popular || "—"}
        </div>
        <div className="stat-label">Most Popular</div>
      </div>
      {SIZES.map((s) =>
        counts[s] > 0 ? (
          <div className="stat-card" key={s}>
            <div className="stat-number gold">{counts[s]}</div>
            <div className="stat-label">{s}</div>
          </div>
        ) : null,
      )}
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [alert, setAlert] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("api/data");
      const data = await res.json();
      if (data.ok) setEntries(data.entries);
      else setAlert({ type: "error", message: data.error });
    } catch {
      setAlert({ type: "error", message: "No data available." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(load, 0);
    return () => clearTimeout(timer);
  }, [load]);

  // Filter + sort alphabetically by name
  const displayed = entries
    .filter((e) => {
      const q = search.toLowerCase();
      const matchQ =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q);
      const matchS = !filterSize || e.size === filterSize;
      return matchQ && matchS;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  async function handleClearAll() {
    if (!window.confirm("Delete ALL registration data? This cannot be undone."))
      return;
    try {
      const res = await fetch("api/data/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.ok) {
        setEntries([]);
        setAlert({ type: "info", message: "All entries have been cleared." });
      } else {
        setAlert({ type: "error", message: data.error });
      }
    } catch {
      setAlert({ type: "error", message: "Failed to clear entries." });
    }
  }

  function handleExport() {
    if (!entries.length) {
      setAlert({ type: "error", message: "No data to export." });
      return;
    }

    const rows = [...entries]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((e, i) => ({
        "#": i + 1,
        "Full Name": e.name,
        "T-Shirt Size": e.size,
        "Submitted At": e.submittedAt,
      }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 5 }, { wch: 26 }, { wch: 14 }, { wch: 22 }];

    const headerCells = ["A1", "B1", "C1", "D1"];
    headerCells.forEach((cell) => {
      if (!ws[cell]) return;
      ws[cell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "1B2A6B" } },
        alignment: { horizontal: "center" },
      };
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "T-Shirt Registrations");
    XLSX.writeFile(wb, "CorporateBuyings_TShirt_Registrations.xlsx");
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard — Corporate Buyings</title>
      </Head>

      <div className="container-wide">
        {/* Page header */}
        <div className="page-header flex-between">
          <div>
            <div className="accent-bar" aria-hidden="true" />
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">
              All T-shirt registrations — sorted alphabetically
            </p>
          </div>
          <div className="flex-end">
            <button className="btn btn-gold btn-sm" onClick={handleExport}>
              📄 Export Excel
            </button>
            <button
              className="btn btn-outline btn-sm"
              onClick={load}
              aria-label="Refresh data"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Stats */}
        <StatsRow entries={entries} />

        {/* Table card */}
        <div className="card" style={{ padding: "1.5rem" }}>
          {/* Toolbar */}
          <div className="toolbar">
            <input
              type="search"
              className="search-input"
              placeholder="🔍 Search by name or code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search entries"
            />
            <select
              className="filter-select"
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              aria-label="Filter by size"
            >
              <option value="">All sizes</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              className="btn btn-outline-red btn-sm"
              onClick={handleClearAll}
            >
              Clear All
            </button>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="empty-state">
              <div className="empty-icon">⏳</div>
              <div className="empty-text">Loading registrations…</div>
            </div>
          ) : displayed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <div className="empty-text">No registrations found</div>
            </div>
          ) : (
            <>
              <div className="table-wrap">
                <table
                  className="data-table"
                  aria-label="T-shirt registrations"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">T-Shirt Size</th>
                      <th scope="col">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayed.map((entry, i) => (
                      <tr key={i}>
                        <td style={{ color: "var(--gray-400)", fontSize: 12 }}>
                          {i + 1}
                        </td>
                        <td style={{ fontWeight: 600 }}>{entry.name}</td>
                        <td>
                          <span
                            className="size-circle"
                            aria-label={`Size ${entry.size}`}
                          >
                            {entry.size}
                          </span>
                        </td>
                        <td style={{ color: "var(--gray-600)", fontSize: 12 }}>
                          {entry.submittedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="table-meta">
                Showing {displayed.length} of {entries.length} entries
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
