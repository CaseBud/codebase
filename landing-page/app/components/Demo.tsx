"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from 'next/image'

export default function Demo() {
  const [activeTab, setActiveTab] = useState(0)

  const demoFeatures = [
    {
      title: "Legal Research",
      description: "Search through thousands of legal documents and get relevant information instantly.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Document Analysis",
      description: "Upload legal documents and get AI-powered analysis and explanations.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Contract Generation",
      description: "Generate custom legal documents with our intelligent templates.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-5 fw-bold mb-4">See It In Action</h2>
          <p className="lead">Watch how CaseBud AI simplifies legal work</p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="nav nav-pills mb-4 justify-content-center" role="tablist">
              {demoFeatures.map((feature, index) => (
                <motion.button
                  key={index}
                  className={`nav-link ${activeTab === index ? "active" : ""}`}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.title}
                </motion.button>
              ))}
            </div>

            <motion.div
              className="tab-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {demoFeatures.map((feature, index) => (
                <div key={index} className={`tab-pane fade ${activeTab === index ? "show active" : ""}`}>
                  <div className="card">
                    <div className="card-body p-4">
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <h3 className="h4 mb-3">{feature.title}</h3>
                          <p>{feature.description}</p>
                        </div>
                        <div className="col-lg-6">
                          <Image
                            src={feature.image || "/placeholder.svg"}
                            alt={feature.title}
                            className="img-fluid rounded"
                            width={500}
                            height={300}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}