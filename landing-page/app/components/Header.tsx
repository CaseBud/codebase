"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import { Scale } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.nav
      className="navbar navbar-expand-lg fixed-top"
      animate={{
        backgroundColor: isScrolled ? "rgba(10, 20, 40, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <motion.a className="navbar-brand d-flex align-items-center gap-2" href="#" whileHover={{ scale: 1.05 }}>
          <Scale className="text-primary" size={28} />
          <span className="gradient-text">CaseBud</span>
        </motion.a>

        <button className="navbar-toggler border-0" type="button" onClick={() => setIsOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <motion.a className="nav-link px-3" href="#features" whileHover={{ color: "#fff" }}>
                Features
              </motion.a>
            </li>
            <li className="nav-item">
              <motion.a className="nav-link px-3" href="#demo" whileHover={{ color: "#fff" }}>
                Demo
              </motion.a>
            </li>
            <li className="nav-item">
              <motion.a className="nav-link px-3" href="#contact" whileHover={{ color: "#fff" }}>
                Contact
              </motion.a>
            </li>
          </ul>
          <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Try It Free
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

