"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className="navbar navbar-expand-lg fixed-top"
      animate={{
        backgroundColor: isScrolled ? "rgba(10, 25, 47, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          <span className="gradient-text">CaseBud</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="#features" className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#demo" className="nav-link">
                Demo
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}

