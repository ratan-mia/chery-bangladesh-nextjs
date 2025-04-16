'use client'

/**
 * Visual separator between sections
 * Following Chery Bangladesh design system guidelines
 * 
 * @param {Object} props
 * @param {boolean} props.centered - Whether to center the separator (default: true)
 * @param {string} props.width - Width of the separator (default: 'w-full')
 * @param {string} props.spacing - Vertical margin (default: 'my-16')
 */
const SectionSeparator = ({ 
  centered = true, 
  width = 'w-full', 
  spacing = 'my-16' 
}) => {
  return (
    <div className={`${spacing} ${centered ? 'flex justify-center' : ''}`}>
      <div className={`${width} relative h-px`} style={{ 
        background: `linear-gradient(to right, transparent, rgba(140, 115, 93, 0.3), transparent)`
      }}>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-px bg-primary-700"></div>
      </div>
    </div>
  );
};

export default SectionSeparator;