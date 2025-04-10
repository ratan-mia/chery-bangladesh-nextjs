
// FormTextarea.jsx
export default function FormTextarea({ 
    id, 
    label, 
    placeholder, 
    value, 
    onChange, 
    error, 
    rows = 4, 
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
        
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full py-3 px-4 transition-colors duration-300 leading-relaxed"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: error 
              ? '1px solid #ef4444' 
              : `1px solid ${theme.accent}44`,
            color: theme.text,
            outline: 'none',
            resize: 'vertical'
          }}
        />
        
        {error && (
          <p className="text-sm" style={{ color: '#ef4444' }}>
            {error}
          </p>
        )}
      </div>
    )
  }