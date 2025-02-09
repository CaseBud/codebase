import { Scale } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-5 bg-secondary-blue">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <Scale className="me-2" size={24} />
              <h5 className="mb-0">CaseBud AI</h5>
            </div>
            <p className="text-muted">Making legal assistance accessible to everyone through AI technology.</p>
          </div>
          <div className="col-6 col-md-2 mb-4">
            <h5>Product</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Demo
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-2 mb-4">
            <h5>Company</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  About
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Blog
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-2 mb-4">
            <h5>Legal</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Privacy
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-muted">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between pt-4 mt-4 border-top">
          <p>&copy; 2025 CaseBud AI. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-light" href="#">
                <i className="bi bi-twitter"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-light" href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-light" href="#">
                <i className="bi bi-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

