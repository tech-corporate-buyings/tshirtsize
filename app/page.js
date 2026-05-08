"use client";
import { useState } from "react";
import Head from "next/head";
import SizeSelector from "../components/SizeSelector";
import Alert from "../components/Alert";

const INITIAL = { name: "", size: "" };

export default function Home() {
  const [form, setForm] = useState(INITIAL);
  const [alert, setAlert] = useState(null); // { type, message }
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAlert(null);
  }

  function handleSizeChange(size) {
    setForm((prev) => ({ ...prev, size }));
    setAlert(null);
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your Full Name.";
    if (!form.size) return "Please select a T-Shirt Size.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const error = validate();
    if (error) {
      setAlert({ type: "error", message: error });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!result.ok) {
        setAlert({ type: "error", message: result.error });
      } else {
        setAlert({
          type: "success",
          message: `Registration successful! Your T-shirt size (${form.size}) has been recorded.`,
        });
        setForm(INITIAL);
      }
    } catch {
      setAlert({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>

      <div className="container"> 
        {/* Page header */}
        <div className="page-header">
          {/* <div className="accent-bar" aria-hidden="true" /> */}
          <h1 className="page-title">T-Shirt Size Registration</h1>
          <p className="page-subtitle">
            Submit your T-shirt size preference. Each employee code is accepted
            once only.
          </p>
        </div>

        {/* Registration card */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon" aria-hidden="true">
              👕
            </div>
            <div>
              <div className="card-title">Employee Registration Form</div>
              <div className="card-desc">
                Fill in your details below to register your T-shirt preference
              </div>
            </div>
          </div>

          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-row">
              <label className="form-label" htmlFor="name">
                Full Name{" "}
                <span className="req" aria-label="required">
                  *
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Size selector */}
            <div className="form-row">
              <label className="form-label" id="size-label">
                T-Shirt Size{" "}
                <span className="req" aria-label="required">
                  *
                </span>
              </label>
              <SizeSelector value={form.size} onChange={handleSizeChange} />
            </div>

            <div className="divider" />

            <div className="flex-between">
              <p className="text-muted">
                🔒 Your data is stored securely and used for T-shirt
                distribution only.
              </p>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
