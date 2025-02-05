'use client';
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="cta-section text-center">
          <h2 className="display-4 fw-bold mb-4 text-white">Ready to Experience the Future of Law?</h2>
          <p className="lead text-white mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Transform your legal work today with CaseBud's groundbreaking AI assistance.
          </p>
          <button 
  onClick={() => window.open('https://casebud-x9h9.onrender.com', '_blank')} 
  className="btn btn-light btn-lg d-inline-flex align-items-center gap-2"
>
  Get Started for Free <ArrowRight size={20} />
</button>
        </div>
      </div>
    </section>
  )
}

