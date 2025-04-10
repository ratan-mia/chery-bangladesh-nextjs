export default function FormInput({ 
    id, 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    error, 
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
        
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full py-3 px-4 transition-colors duration-300"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: error 
              ? '1px solid #ef4444' 
              : `1px solid ${theme.accent}44`,
            color: theme.text,
            outline: 'none'
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