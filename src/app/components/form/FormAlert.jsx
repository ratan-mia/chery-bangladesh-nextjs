// FormAlert.jsx
export default function FormAlert({ type, message }) {
    const styles = {
      success: {
        bg: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid #10b981',
        text: '#10b981'
      },
      error: {
        bg: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid #ef4444',
        text: '#ef4444'
      },
      warning: {
        bg: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid #f59e0b',
        text: '#f59e0b'
      }
    }
    
    const style = styles[type] || styles.info
    
    return (
      <div 
        className="p-4"
        style={{
          backgroundColor: style.bg,
          border: style.border
        }}
      >
        <p style={{ color: style.text }}>
          {message}
        </p>
      </div>
    )
  }