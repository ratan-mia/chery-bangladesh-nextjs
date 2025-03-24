'use client'


export default function CarDisplay({ model }) {
  // Get car specs based on model
  const getModelSpecs = (model) => {
    const specs = {
      'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800' },
      'tiggo9plus': { engine: '2.0', length: '4820', wheelbase: '2850' },
      'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710' },
      'tiggo8plus': { engine: '1.8', length: '4720', wheelbase: '2720' },
      'tiggo8pro': { engine: '1.8', length: '4745', wheelbase: '2710' },
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670' },
      'tiggo7pro': { engine: '1.5', length: '4520', wheelbase: '2675' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780' },
      'arrizo8plus': { engine: '1.6', length: '4795', wheelbase: '2790' },
      'arrizo6': { engine: '1.5', length: '4630', wheelbase: '2670' },
      'arrizo5plus': { engine: '1.5', length: '4530', wheelbase: '2610' }
    }
    
    return specs[model] || specs['tiggo9']
  }
  
  // Get car color for display
  const getCarColor = (model) => {
    if (model?.includes('tiggo9')) return '#008770' // Teal
    if (model?.includes('tiggo8')) return '#1E5945' // Dark green  
    if (model?.includes('tiggo7')) return '#00A8E8' // Blue
    if (model?.includes('tiggo4')) return '#556B2F' // Olive
    if (model?.includes('tiggo2')) return '#C23B22' // Red
    if (model?.includes('arrizo8')) return '#003F5C' // Navy
    if (model?.includes('arrizo6')) return '#444444' // Dark gray
    if (model?.includes('arrizo5')) return '#8A2BE2' // Purple
    return '#008770' // Default teal
  }
  
  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return ''
    return model.replace(/([a-z])([0-9])/i, '$1 $2').replace(/^([a-z])/, match => match.toUpperCase())
  }
  
  const specs = getModelSpecs(model)
  const carColor = getCarColor(model)
  
  return (
    <div className="absolute top-1/2 left-1/2 lg:left-3/5 transform -translate-y-1/2 -translate-x-1/2 lg:-translate-x-1/2 w-4/5 lg:w-2/3 text-right transition-all duration-300">
      <div className="w-full h-48 sm:h-64 md:h-80 relative mb-5">
        <div style={{ 
          backgroundColor: carColor, 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' 
        }}>
          <div className="text-white text-3xl md:text-5xl font-bold">
            {formatModelName(model)}
          </div>
        </div>
      </div>
      
      <div className="flex justify-around flex-wrap">
        <div className="text-center p-2">
          <div className="text-sm text-gray-600 mb-2">Engine</div>
          <div className="text-4xl lg:text-5xl text-gray-800 font-bold">
            {specs.engine}<span className="text-sm lg:text-base text-gray-500 align-super">T</span>
          </div>
        </div>
        
        <div className="text-center p-2">
          <div className="text-sm text-gray-600 mb-2">Length</div>
          <div className="text-4xl lg:text-5xl text-gray-800 font-bold">
            {specs.length}<span className="text-sm lg:text-base text-gray-500 align-super">mm</span>
          </div>
        </div>
        
        <div className="text-center p-2">
          <div className="text-sm text-gray-600 mb-2">Wheelbase</div>
          <div className="text-4xl lg:text-5xl text-gray-800 font-bold">
            {specs.wheelbase}<span className="text-sm lg:text-base text-gray-500 align-super">mm</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-cheryButton text-white border-none py-4 px-10 text-base uppercase cursor-pointer hover:bg-cheryButtonHover transition-colors">
          Explore
        </button>
      </div>
    </div>
  )
}