"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section className="section-padding" id="contact">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-5 fw-bold mb-4">Contact Us</h2>
          <p className="lead">Get in touch with our team</p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-body p-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea className="form-control" id="message" rows={5} required></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>

            <div className="row mt-5">
              <div className="col-md-4">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Mail size={24} className="mb-3 text-primary" />
                  <h4 className="h5">Email</h4>
                  <p>CaseBudAi@Gmail.com</p>
                </motion.div>
              </div>
              <div className="col-md-4">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Phone size={24} className="mb-3 text-primary" />
                  <h4 className="h5">Phone</h4>
                  <p>+234 901 299 5866</p>
                  <p>+234 906 781 2179</p>
                  <p>+234 705 139 9129</p>
                </motion.div>
              </div>
              <div className="col-md-4">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <MapPin size={24} className="mb-3 text-primary" />
                  <h4 className="h5">Location</h4>
                  <p>Lagos</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

