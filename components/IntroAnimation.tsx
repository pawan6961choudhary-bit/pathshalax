"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function IntroAnimation() {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro")

    if (!hasSeenIntro) {
      setShowAnimation(true)

      const fadeOutTimer = setTimeout(() => {
        setShowAnimation(false)
        // Mark that user has seen the intro
        localStorage.setItem("hasSeenIntro", "true")
      }, 2800)

      return () => {
        clearTimeout(fadeOutTimer)
      }
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-8">
            {/* Animated "P" Logo */}
            <motion.svg width="120" height="120" viewBox="0 0 120 120" initial="hidden" animate="visible">
              <motion.path
                d="M30 20 L30 100 M30 20 L70 20 C85 20, 95 30, 95 45 C95 60, 85 70, 70 70 L30 70"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: { duration: 1.5, ease: "easeInOut" },
                      opacity: { duration: 0.3 },
                    },
                  },
                }}
              />
            </motion.svg>

            {/* PathshalaX Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold text-white mb-2">PathshalaX</h1>
              <p className="text-xl text-blue-400">Transform Your Learning Journey</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
