import { Briefcase, GraduationCap, Home, ShoppingBag } from "lucide-react"

const useCases = [
    {
        icon: Briefcase,
        title: "Business & Corporate Law",
        description: "Get expert guidance on contracts, compliance, and legal regulations for your business.",
        color: "var(--primary-blue)",
    },
    {
        icon: GraduationCap,
        title: "Education & Student Rights",
        description: "Understand education laws, academic policies, and student rights with AI assistance.",
        color: "var(--secondary-purple)",
    },
    {
        icon: Home,
        title: "Personal Legal Matters",
        description: "Receive support on family law, tenancy agreements, wills, and personal legal issues.",
        color: "var(--accent-pink)",
    },
    {
        icon: ShoppingBag,
        title: "Consumer Rights & Retail Law",
        description: "Learn about your rights as a consumer, dispute resolutions, and fair trade laws.",
        color: "var(--primary-blue)",
    },
    
]

export default function UseCases() {
  return (
    <section className="section-padding bg-navy-blue">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-4">
            CaseBud for
            <br />
            <span className="gradient-text">Every Scenario</span>
          </h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Explore how CaseBud can be applied in various fields to enhance productivity and innovation.
          </p>
        </div>

        <div className="row g-4">
          {useCases.map((useCase, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 p-4" style={{ borderColor: useCase.color }}>
                <div className="card-body">
                  <useCase.icon style={{ color: useCase.color }} className="mb-4" size={40} />
                  <h3 className="h4 mb-3 card-header">{useCase.title}</h3>
                  <p className="text-secondary mb-0">{useCase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

