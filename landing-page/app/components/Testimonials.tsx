import Image from 'next/image'

const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Marketing Manager",
      company: "TechCorp",
      image: "/placeholder.svg?height=96&width=96",
      quote:
        "StreamLine has revolutionized the way our marketing team collaborates. We've seen a 30% increase in productivity since implementing it.",
    },
    {
      name: "John Doe",
      role: "Project Manager",
      company: "InnovateCo",
      image: "/placeholder.svg?height=96&width=96",
      quote:
        "The analytics features in StreamLine have been a game-changer for our project management. We can now make data-driven decisions with confidence.",
    },
    {
      name: "Emily Chen",
      role: "CEO",
      company: "StartupX",
      image: "/placeholder.svg?height=96&width=96",
      quote:
        "As a startup, we needed a solution that could grow with us. StreamLine has been the perfect fit, offering both simplicity and scalability.",
    },
  ]
  
  const Testimonials = () => {
    return (
      <section className="bg-gray-50 overflow-hidden" id="testimonials">
        <div className="relative max-w-7xl mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20">
          <div className="relative lg:flex lg:items-center">
            <div className="hidden lg:block lg:flex-shrink-0">
              <Image
                className="h-64 w-64 rounded-full xl:h-80 xl:w-80"
                src="/placeholder.svg?height=320&width=320"
                alt="Customer testimonial"
                width={320}
                height={320}
              />
            </div>
            <div className="relative lg:ml-10">
              <svg
                className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-indigo-200 opacity-50"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 144 144"
              >
                <path
                  strokeWidth={2}
                  d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-13.96 0-25.128 10.704-25.128 24.664 0 13.96 11.168 25.129 25.128 25.129 13.96 0 25.128-11.169 25.128-25.129 0-13.96-11.168-25.128-25.128-25.128-13.96 0-25.128 11.168-25.128 25.128"
                />
              </svg>
              <blockquote className="relative">
                <div className="text-2xl leading-9 font-medium text-gray-900">
                  <p>&ldquo;{testimonials[0].quote}&rdquo;</p>
                </div>
                <footer className="mt-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Image className="h-12 w-12 rounded-full" src={testimonials[0].image || "/placeholder.svg"} alt="" width={96} height={96} />
                    </div>
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">{testimonials[0].name}</div>
                      <div className="text-base font-medium text-indigo-600">
                        {testimonials[0].role}, {testimonials[0].company}
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default Testimonials