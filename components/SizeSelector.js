import { SIZES } from '../lib/storage'

/**
 * Alphabetical T-shirt size picker.
 * Props: value (string), onChange (fn)
 */
export default function SizeSelector({ value, onChange }) {
  return (
    <div>
      <div className="size-grid" role="group" aria-label="Select T-shirt size">
        {SIZES.map((size) => (
          <button
            key={size}
            type="button"
            className={`size-btn${value === size ? ' selected' : ''}`}
            onClick={() => onChange(size)}
            aria-pressed={value === size}
            aria-label={`Size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
      {value ? (
        <p className="form-hint" style={{ color: 'var(--navy)', fontWeight: 600 }}>
          Selected: {value}
        </p>
      ) : (
        <p className="form-hint">Click a size to select</p>
      )}
    </div>
  )
}
