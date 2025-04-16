'use client'

/**
 * Decorative background elements for sections
 * @param {Object} props
 * @param {boolean} props.withPattern - Whether to include subtle pattern overlay
 * @param {boolean} props.withGradient - Whether to include gradient blob effects
 * @param {boolean} props.withBottomBorder - Whether to include bottom border highlight
 */
const BackgroundElements = ({ 
  withPattern = true, 
  withGradient = true, 
  withBottomBorder = true 
}) => {
  return (
    <>
      {/* Background subtle pattern */}
      {withPattern && (
        <div 
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Decorative gradient elements */}
      {withGradient && (
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-primary-700"
          aria-hidden="true"
        />
      )}
      
      {/* Bottom border highlight */}
      {withBottomBorder && (
        <div 
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ 
            background: `linear-gradient(to right, transparent, rgba(140, 115, 93, 0.3), transparent)`
          }}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default BackgroundElements