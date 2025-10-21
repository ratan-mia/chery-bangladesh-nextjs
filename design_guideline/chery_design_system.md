# Chery Bangladesh Design System Guidelines

## Brand Overview

The Chery Bangladesh design system creates a premium automotive digital experience that balances modern aesthetics with functional clarity. The design language emphasizes clean lines, subtle animations, and a refined approach that puts content and vehicle imagery at the forefront while using an elegant, warm neutral color palette.

## Core Design Principles

### 1. Elegant Minimalism
- Favor clean, uncluttered layouts with ample white space
- Use subtle borders and separators to create visual hierarchy
- Emphasize content through typography and spacing rather than excessive decorative elements

### 2. Purposeful Motion
- Animations should enhance usability, not distract
- Use motion to guide attention and provide feedback
- Apply consistent timing and easing for cohesive experience
- Implement hover states that reveal additional information or functionality

### 3. Content Focus
- Vehicle imagery and key messaging should be prominent
- Use gradient overlays to maintain text legibility over images
- Create clear visual hierarchy that guides users through the content

### 4. Premium Feel
- Attention to detail in spacing, alignment, and typography
- Subtle interactions that feel refined and intentional
- Consistent components that work together harmoniously
- Warm neutral palette that evokes premium materials and craftsmanship

## Color Palette

### Primary Colors
```css
--primary-light: #c4b19c;   /* Tailwind: primary-light */
--primary-700: #8c735d;     /* Tailwind: primary-700 */
--primary-800: #b7a99a;     /* Tailwind: primary-800 */
--primary-900: #524336;     /* Tailwind: primary-900 */
```

### Neutral Palette
```css
--black: #000000;
--white: #FFFFFF;
--gray-900: #111827;  /* Headings and primary text */
--gray-600: #4B5563;  /* Body text */
--gray-500: #6B7280;  /* Secondary text */
--gray-200: #E5E7EB;  /* Borders */
--gray-100: #F3F4F6;  /* Background accents */
```

### Supporting Colors
```css
--success-green: #10B981;  /* Success states */
--warning-yellow: #F59E0B; /* Warning states */
--error-red: #EF4444;      /* Error states */
```

### Color Usage Guidelines
- Use Primary 900 (`#524336`) for main headings, important text highlights, and primary brand elements
- Use Primary 700 (`#8c735d`) for buttons, dividers, and interactive elements
- Use Primary 800 (`#b7a99a`) for subtle accents and secondary interactive elements
- Use Primary Light (`#c4b19c`) for backgrounds of brand elements, icon containers, and subtle highlights
- Layer shades with opacity variations to create depth (e.g., `bg-opacity-40`, `bg-opacity-60`)

## Typography

### Font Family
```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Font Sizes
**Headings:**
- H1: `text-4xl md:text-5xl lg:text-6xl` (2.25rem to 3.75rem)
- H2: `text-3xl md:text-4xl lg:text-5xl` (1.875rem to 3rem)
- H3: `text-2xl md:text-3xl` (1.5rem to 1.875rem)
- H4: `text-xl md:text-2xl` (1.25rem to 1.5rem)
- H5: `text-lg md:text-xl` (1.125rem to 1.25rem)

**Body:**
- Body Large: `text-lg` (1.125rem)
- Body: `text-base` (1rem)
- Body Small: `text-sm` (0.875rem)
- Caption: `text-xs` (0.75rem)

### Font Weights
- Bold: `font-bold` (700)
- Medium: `font-medium` (500)
- Regular: `font-normal` (400)

### Line Heights
- Headings: `leading-tight` (1.25)
- Body: `leading-normal` (1.5)
- Tight text: `leading-snug` (1.375)

## Spacing System

Follow the Tailwind CSS spacing scale:

- **Micro Spacing:** `space-x-1 space-y-1` (0.25rem)
- **Small Spacing:** `space-x-2 space-y-2` (0.5rem), `space-x-3 space-y-3` (0.75rem)
- **Medium Spacing:** `space-x-4 space-y-4` (1rem), `space-x-6 space-y-6` (1.5rem)
- **Large Spacing:** `space-x-8 space-y-8` (2rem), `space-x-12 space-y-12` (3rem)
- **Extra Large Spacing:** `space-x-16 space-y-16` (4rem), `space-x-20 space-y-20` (5rem)

## Layout

### Container
- Use `max-w-7xl mx-auto px-4 md:px-6` for consistent page width
- Ensure responsive padding adapts to screen sizes

### Grid System
- Use CSS Grid for complex layouts: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- Use Flexbox for simpler alignment needs: `flex items-center justify-between`

**Common grid patterns:**
- 1-column mobile, 2-3 columns tablet, 4-12 columns desktop

### Section Spacing
- **Vertical rhythm:** `py-20` (5rem) for standard section padding
- **Smaller sections:** `py-12` (3rem) or `py-16` (4rem)
- **Footer:** `pt-16 pb-8` (top: 4rem, bottom: 2rem)

## Components

### Buttons

#### Primary Button
```jsx
<a
  href="#contact"
  className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
>
  Schedule Your Service
  <ArrowRight
    size={20}
    className="ml-2 group-hover:ml-3 transition-all duration-300"
  />
</a>
```

#### Secondary Button
```jsx
<a
  href="#dealerships"
  className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-primary-700 px-8 py-4 font-medium hover:bg-primary-700 hover:text-white transition-all duration-300"
>
  Find Dealership
</a>
```

#### Tertiary Button (Text Link)
```jsx
<a
  href="#view-more"
  className="group inline-flex items-center text-sm font-medium text-primary-700 tracking-wider hover:text-primary-900 transition-colors duration-300"
>
  VIEW ALL
  <ArrowRight
    size={16}
    className="ml-2 group-hover:ml-3 transition-all duration-300"
  />
</a>
```

### Cards

#### Feature Card
```jsx
<div className="relative border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-primary-700 transition-all duration-300">
  {/* Top accent */}
  <div className="h-1 w-full bg-primary-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Content */}
  <div className="p-8">
    <div className="w-16 h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mb-6">
      <Icon className="text-primary-900" size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Title</h3>
    <p className="text-gray-600 leading-normal mb-8">Feature description text goes here.</p>
    <div className="flex items-center text-primary-700 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span>Learn more</span>
      <ArrowRight
        size={16}
        className="ml-2 group-hover:ml-3 transition-all duration-300"
      />
    </div>
  </div>
  
  {/* Bottom accent line that fills on hover */}
  <div className="h-0.5 w-full bg-gray-200 mt-auto">
    <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
  </div>
</div>
```

#### News/Blog Card
```jsx
<article className="group flex flex-col h-full overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300">
  {/* Image container with gradient overlay */}
  <div className="relative aspect-[16/9] overflow-hidden">
    <Image
      src={articleImage}
      alt={articleTitle}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* Gradient overlay that appears from bottom to top on hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Category label */}
    <div className="absolute bottom-0 left-0 bg-white py-1 px-3 z-10">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-900">{category}</span>
    </div>
  </div>
  
  <div className="flex flex-col flex-grow p-6 border-l border-r border-b border-gray-200">
    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-900 transition-colors duration-300">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{date}</p>
    <p className="text-gray-600 mb-6">{excerpt}</p>
    <div className="mt-auto">
      <span className="inline-flex items-center text-primary-700 font-medium group-hover:text-primary-900 transition-colors duration-300">
        Read More
        <ArrowRight size={16} className="ml-2 group-hover:ml-3 transition-all duration-300" />
      </span>
    </div>
  </div>
</article>
```

#### Service/Product Card
```jsx
<div className="relative group">
  <div className="relative overflow-hidden">
    <Image
      src={service.image}
      alt={service.title}
      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
      width={400}
      height={300}
    />
    <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-primary-900/0 transition-colors duration-300" />
  </div>
  
  <div className="p-6 bg-white border border-t-0 border-gray-200 group-hover:border-primary-700 transition-colors duration-300">
    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
    <p className="text-gray-600 mb-4">{service.description}</p>
    <a
      href={service.link}
      className="inline-flex items-center text-primary-700 font-medium hover:text-primary-900 transition-colors duration-300"
    >
      Learn More
      <ArrowRight size={16} className="ml-2 group-hover:ml-3 transition-all duration-300" />
    </a>
  </div>
</div>
```

### Section Headers
```jsx
<div className="text-center mb-16">
  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
    Section <span className="text-primary-900">Title</span>
  </h2>
  <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
  <p className="text-gray-600 text-lg max-w-3xl mx-auto">
    Descriptive text about the section that explains the purpose or content.
  </p>
</div>
```

### Info Boxes
```jsx
<div className="bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 p-6 shadow-sm">
  <div className="flex items-center mb-4">
    <Icon className="h-6 w-6 text-primary-700 mr-2" />
    <span className="text-gray-900 font-medium">Box Title</span>
  </div>
  <p className="text-gray-600">
    Informational content goes here.
  </p>
</div>
```

## Animation Guidelines

### Transitions
Use consistent durations:
- **Fast:** `duration-200` (200ms)
- **Medium:** `duration-300` (300ms)
- **Slow:** `duration-500` (500ms)

Common transition properties:
- Colors: `transition-colors`
- Transform: `transition-transform`
- Opacity: `transition-opacity`
- All: `transition-all` (use sparingly)

### Framer Motion Patterns

#### Fade and Rise In
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
>
  {/* Content */}
</motion.div>
```

#### Staggered Children
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

## Responsive Design

### Breakpoints
Follow Tailwind CSS default breakpoints:
- **Small (sm):** 640px and up
- **Medium (md):** 768px and up
- **Large (lg):** 1024px and up
- **Extra Large (xl):** 1280px and up
- **2xl:** 1536px and up

### Mobile-First Approach
- Start with mobile design and add complexity at larger breakpoints
- Stack elements vertically on mobile, arrange horizontally on larger screens
- Hide non-essential elements on mobile with `hidden md:block`
- Show mobile-specific elements with `block md:hidden`

### Common Responsive Patterns
```jsx
// Typography scaling
<h2 className="text-2xl md:text-3xl lg:text-4xl">Heading</h2>

// Grid adjustments
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Padding/margin adjustments
<section className="py-8 md:py-12 lg:py-20">

// Flexbox direction changes
<div className="flex flex-col md:flex-row">
```

## Accessibility Guidelines

### Color Contrast
- Ensure text has sufficient contrast against backgrounds (4.5:1 for normal text, 3:1 for large text)
- Don't rely solely on color to convey information
- Test with grayscale to verify sufficient contrast

### Interactive Elements
- Buttons and links should have visible focus states
- Minimum touch target size of 44x44px for mobile
- Use `aria-label` for icons without visible text

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Visible focus states that are consistent with design language

## Implementation Notes

### Tailwind Configuration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary-light': '#c4b19c',
        'primary-700': '#8c735d',
        'primary-800': '#b7a99a',
        'primary-900': '#524336',
        // Other custom colors...
      },
      // Other theme extensions...
    },
  },
  // Other config options...
}
```

### Component Structure
- Keep components focused on a single responsibility
- Use composition to build complex UIs from simple components
- Extract repeated patterns into reusable components

## Best Practices

### 1. Maintain Visual Hierarchy
- Use size, color, and spacing to guide users' attention
- Most important elements should be most prominent
- Create clear reading paths through content

### 2. Optimize Performance
- Lazy load below-the-fold images
- Use `priority` attribute only for critical above-the-fold images
- Use `whileInView` with `viewport={{ once: true }}` for animations

### 3. Mobile Considerations
- Ensure touch targets are at least 44px tall/wide
- Test on real devices when possible
- Consider network performance and optimize accordingly

### 4. Consistency
- Follow these guidelines for all new components
- Update existing components to match when feasible
- Maintain a "single source of truth" for design patterns

---

## Getting Started

1. Install the required dependencies:
   ```bash
   npm install tailwindcss framer-motion
   ```

2. Configure Tailwind with the custom color palette (see configuration above)

3. Import and use components following the patterns outlined in this guide

4. Test thoroughly across different devices and screen sizes

For questions or contributions to this design system, please refer to the team documentation or reach out to the design team.