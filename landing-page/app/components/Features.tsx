import { MessageSquare, Search, Zap, Globe, BookOpen, Code, Lightbulb, Headphones, FileText } from "lucide-react"

const features = [
    {
        icon: MessageSquare,
        title: "Legal Conversations",
        description: "Engage in intelligent, context-aware discussions with our AI-powered legal assistant.",
    },
    {
        icon: Search,
        title: "Instant Legal Answers",
        description: "Get quick and reliable legal information on various topics, anytime.",
    },
    {
        icon: Zap,
        title: "Legal Task Automation",
        description: "Streamline document drafting, contract reviews, and other legal tasks with AI assistance.",
    },
    {
        icon: Globe,
        title: "Multilingual Legal Support",
        description: "Receive legal guidance in multiple languages for seamless communication.",
    },
    {
        icon: BookOpen,
        title: "Legal Research Assistance",
        description: "Simplify legal research with AI-powered insights and case law summaries.",
    },
    {
        icon: FileText,
        title: "Document Drafting",
        description: "Generate legal documents, contracts, and agreements efficiently with AI.",
    },
    {
        icon: Lightbulb,
        title: "Legal Insights",
        description: "Gain valuable legal insights and recommendations tailored to your case.",
    },
    {
        icon: Headphones,
        title: "Voice-Powered Assistance",
        description: "Ask legal questions and receive guidance through voice interaction with CaseBud.",
    },    
]

export default function Features() {
  return (
    <section className="section-padding" id="features">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-4">
            Powerful Features for
            <br />
            <span className="gradient-text">Everyone</span>
          </h2>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "600px" }}>
            Discover how CaseBud can assist you in various tasks and boost your productivity.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="card h-100 p-4">
              <div className="card-body">
                <feature.icon className="feature-icon" size={32} />
                <h3 className="h4 mb-3">{feature.title}</h3>
                <p className="text-secondary mb-0">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

