/**
 * Common animation variants for use with Framer Motion
 */

// Container animation with staggered children (subtle)
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  // Stronger staggering effect for featured elements
  export const featuredContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }
  
  // Standard item animation for most elements
  export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  // More subtle animation for sidebar/secondary elements
  export const sidebarItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }
  
  // Animation for items that scale in
  export const scaleItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  // Animation for elements that slide in from the left
  export const slideInLeftVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  // Animation for elements that slide in from the right
  export const slideInRightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  
  // Transition settings for hover effects
  export const hoverTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  }
  
  // Button hover animation
  export const buttonHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: hoverTransition
    },
    tap: { scale: 0.98 }
  }
  
  // Card hover animation
  export const cardHoverVariants = {
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: hoverTransition
    }
  }
  
  // Animation for section headers
  export const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  }