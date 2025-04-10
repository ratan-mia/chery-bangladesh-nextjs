// FormSelect.jsx
export default function FormSelect({ 
    id, 
    label, 
    value, 
    onChange, 
    options = [], 
    theme 
  }) {
    return (
      <div className="space-y-2">
        <label 
          htmlFor={id} 
          className="block text-lg font-medium"
          style={{ color: theme.textSecondary }}
        >
          {label}
        </label>
        
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full py-3 px-4 appearance-none transition-colors duration-300"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${theme.accent}44`,
            color: theme.text,
            outline: 'none'
          }}
        >
          <option value="">Select a model (optional)</option>
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value}
              style={{
                backgroundColor: '#111827',
                color: theme.text
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }