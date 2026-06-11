interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  hint,
}: FieldProps) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
          {label}
          {required && <span className="text-gold-400 ml-1">*</span>}
        </span>
        {hint && <span className="text-[10px] text-[var(--text-muted)]">{hint}</span>}
      </div>
      <input
        type={type}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}

interface SelectProps<T extends string> {
  label: string
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  required?: boolean
}

export function Select<T extends string>({
  label,
  value,
  onChange,
  options,
  required,
}: SelectProps<T>) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-1.5">
        {label}
        {required && <span className="text-gold-400 ml-1">*</span>}
      </div>
      <select
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-900">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
