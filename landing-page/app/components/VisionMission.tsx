import { Rocket, Target, Clock } from "lucide-react"

export default function VisionMission() {
  return (
    <section className="section-padding" id="vision-mission">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <Target className="feature-icon" size={40} />
                <h3 className="h4 mb-3">Our Vision</h3>
                <p className="text-secondary">
                To provide accessible legal guidance and support to individuals who may lack resources,
                 helping them understand their rights and navigate legal challenges effectively.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <Rocket className="feature-icon" size={40} />
                <h3 className="h4 mb-3">Our Mission</h3>
                <p className="text-secondary">
                To provide innovative legal technology that simplifies complex legal processes, enhances legal professionals' efficiency,
                 and improves access to justice through advanced technological solutions.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 p-4">
              <div className="card-body">
                <Clock className="feature-icon" size={40} />
                <h3 className="h4 mb-3">Future Updates</h3>
                <ul className="text-secondary list-unstyled">
                  <li className="mb-2">✓ Enhanced language understanding</li>
                  <li className="mb-2">✓ Integration with popular tools and platforms</li>
                  <li className="mb-2">✓ Customizable AI assistants</li>
                  <li>✓ Advanced data analysis capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

