'use client';

import Image from 'next/image'
import { MessageSquare, Zap, Shield } from "lucide-react"

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-pattern"></div>
      <div className="blob" style={{ top: "20%", left: "10%" }}></div>
      <div className="blob" style={{ top: "60%", right: "10%" }}></div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold mb-4 lh-sm">
              Your AI-Powered
              <br />
              <span className="gradient-text">Chat Assistant</span>
            </h1>
            <p className="lead mb-5 text-secondary" style={{ fontSize: "1.25rem" }}>
              Get instant legal answers and expert guidance anytime. Simplify your legal research and tasks with advanced AI-powered assistance.
            </p>
            


            <div className="mt-5 d-flex gap-4">
              <div className="d-flex align-items-center">
                <MessageSquare size={24} className="text-primary me-2" />
                <span>24/7 Support</span>
              </div>
              <div className="d-flex align-items-center">
                <Zap size={24} className="text-primary me-2" />
                <span>Instant Answers</span>
              </div>
              <div className="d-flex align-items-center">
                <Shield size={24} className="text-primary me-2" />
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
            <Image
  src="/CaseBud Demo.png" // Place the image in the public folder
  alt="CaseBud AI Interface"
  className="img-fluid rounded-4 shadow-lg floating"
  style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
  width={500}
  height={500}
/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}