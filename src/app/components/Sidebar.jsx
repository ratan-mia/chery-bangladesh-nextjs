'use client'


export default function Sidebar({ onCategorySelect, activeCategory }) {
  const handleCategoryClick = (category) => {
    onCategorySelect(category)
  }

  return (
    <aside className="w-64 bg-cherySidebar text-white py-10">
      <ul className="list-none">
        <li 
          className={`py-5 px-8 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeCategory === 'tiggo' ? 'bg-white bg-opacity-20' : ''}`}
          onClick={() => handleCategoryClick('tiggo')}
        >
          Tiggo
        </li>
        <li 
          className={`py-5 px-8 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeCategory === 'arrizo' ? 'bg-white bg-opacity-20' : ''}`}
          onClick={() => handleCategoryClick('arrizo')}
        >
          Arrizo
        </li>
      </ul>
    </aside>
  )
}