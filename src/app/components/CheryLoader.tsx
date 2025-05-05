'use client'

import { motion } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * CheryLoader - A premium loading animation component
 * 
 * This loader displays the Chery logo with elegant animations
 * following the brand's design system guidelines.
 * Also handles route transitions for a seamless loading experience.
 * 
 * @param {Object} props
 * @param {boolean} props.isLoading - Controls if the loader is visible for initial load
 * @param {string} props.bgColor - Background color of the loader
 * @param {number} props.duration - Duration of the loading animation in seconds
 * @param {boolean} props.enableRouteTransition - Enable loading on route changes
 * @param {number} props.routeTransitionDuration - Duration of route transition loading in seconds
 */
export default function CheryLoader({
  isLoading: initialLoading = true,
  bgColor = '#f8f5f1',
  duration = 3,
  enableRouteTransition = true,
  routeTransitionDuration = 0.8
}) {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [prevPathname, setPrevPathname] = useState('')

  // Next.js route detection
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Primary colors from design system
  const colors = {
    primaryLight: '#c4b19c',
    primary700: '#8c735d',
    primary800: '#b7a99a',
    primary900: '#524336'
  }

  // Route change detection
  useEffect(() => {
    // Only trigger if enableRouteTransition is true
    if (!enableRouteTransition) return

    // Skip initial render and minor changes
    if (!prevPathname || pathname === prevPathname) {
      setPrevPathname(pathname)
      return
    }

    // When route changes, show loader
    setProgress(0)
    setIsLoading(true)
    setIsExiting(false)

    // Hide loader after route transition duration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, routeTransitionDuration * 1000)

    setPrevPathname(pathname)
    return () => clearTimeout(timer)
  }, [pathname, searchParams, enableRouteTransition, prevPathname, routeTransitionDuration])

  // Handle initial loading state changes
  useEffect(() => {
    // Update isLoading state when the initialLoading prop changes
    setIsLoading(initialLoading)
  }, [initialLoading])

  // Animate the progress bar
  useEffect(() => {
    if (!isLoading && progress >= 100) {
      setIsExiting(true)
      return
    }

    if (!isLoading && progress < 100) {
      // If loading ends before progress reaches 100%, accelerate to complete
      const remaining = 100 - progress
      const acceleratedDuration = Math.min(remaining * 10, 500) // Max 500ms

      const timer = setTimeout(() => {
        setProgress(100)
      }, acceleratedDuration)

      return () => clearTimeout(timer)
    }

    if (isLoading && progress < 100) {
      // Use shorter steps for route transitions
      const isRouteTransition = prevPathname && pathname !== prevPathname
      const currentDuration = isRouteTransition ? routeTransitionDuration : duration
      const step = 100 / (currentDuration * 10) // 10 steps per second

      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + step, 99.5)) // Cap at 99.5% until loading complete
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isLoading, progress, duration, routeTransitionDuration, pathname, prevPathname])

  // SVG logo animation variants
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: {
        duration: 0.5,
        ease: "easeIn"
      }
    }
  }

  // Container animation variants
  const containerVariants = {
    visible: {
      opacity: 1
    },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.4,
        duration: 0.6
      }
    }
  }

  // If the exit animation has completed, don't render anything
  if (isExiting && !isLoading) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: bgColor }}
      initial="visible"
      animate={!isLoading && progress >= 100 ? "exit" : "visible"}
      variants={containerVariants}
      onAnimationComplete={() => {
        if (!isLoading && progress >= 100) setIsExiting(true)
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid-pattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke={colors.primary800} strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary-light opacity-20 filter blur-3xl -translate-x-40 -translate-y-40"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-700 opacity-10 filter blur-3xl translate-x-1/3 translate-y-1/3"></div>

      {/* Logo container */}
      <motion.div
        className="relative"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Chery Logo SVG */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          {/* Circular background */}
          <circle cx="50" cy="50" r="45" fill={colors.primaryLight} fillOpacity="0.2" />

          {/* Chery Logo - Simplified representation */}
          <motion.path
            d="M50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20ZM50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75C36.1929 75 25 63.8071 25 50C25 36.1929 36.1929 25 50 25Z"
            fill={colors.primary900}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Stylized Chery 'C' */}
          <motion.path
            d="M42 37C39 37 35 38 32 42C29 46 29 51 32 55C35 59 39 60 42 60C45 60 47 59 49 57L46 53C45 54 44 55 42 55C40 55 38 54 36.5 52C35 50 35 47 36.5 45C38 43 40 42 42 42C44 42 45 43 46 44L49 40C47 38 45 37 42 37Z"
            fill={colors.primary700}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Stylized Chery cross element */}
          <motion.path
            d="M60 37L55 45L50 37H45L53 50L45 63H50L55 55L60 63H65L57 50L65 37H60Z"
            fill={colors.primary900}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </svg>

        {/* Brand name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-primary-900 tracking-wider">CHERY</h2>
          <p className="text-sm text-primary-700 uppercase tracking-widest mt-1">Bangladesh</p>
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-gray-200 mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary-700"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="text-xs text-gray-500 mt-4 tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5 }}
      >
        {progress >= 100 ? "Ready" : "Loading"}
      </motion.p>
    </motion.div>
  )
}