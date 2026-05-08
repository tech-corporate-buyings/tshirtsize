/**
 * Alert banner.
 * Props: type ('success' | 'error' | 'info'), message (string), onClose (optional fn)
 */
export default function Alert({ type = 'info', message, onClose }) {
  if (!message) return null

  const icons = {
    success: '✓',
    error: '⚠',
    info: 'ℹ',
  }

  return (
    <div className={`alert alert-${type}`} role="alert" aria-live="polite">
      <span className="alert-icon" aria-hidden="true">{icons[type]}</span>
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: 'inherit',
            opacity: 0.6,
            padding: '0 2px',
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
