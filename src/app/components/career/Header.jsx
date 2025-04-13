'use client'


// Header Component
const SectionHeader = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-16">
      <div 
        className="h-1 w-24 mx-auto mb-6 bg-primary-600"
      />
      
      <span
        className="inline-block text-sm uppercase tracking-wider mb-3 text-primary-600"
      >
        {subtitle}
      </span>
      
      <h2 
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-white"
      >
        {title}
      </h2>
      
      <p
        className="max-w-3xl mx-auto text-lg text-gray-300"
      >
        {description}
      </p>
    </div>
  )
}