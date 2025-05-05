"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  text: string
  author: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "I spoke to a very helpful Gary Mower. He had quite a simple approach and was very understanding of my situation.",
    author: "Anonymous",
  },
  {
    id: 2,
    text: "Now going into my 3rd year, I only have 2 years left before getting into a much better financial position.",
    author: "Anonymous",
  },
  {
    id: 3,
    text: "Very understanding, offered a few solutions instead of just one.",
    author: "Anonymous",
  },
  {
    id: 4,
    text: "Pravesh Dhawotat was very helpful and had great customer service skills.",
    author: "Anonymous",
  },
  {
    id: 5,
    text: "The team was very professional and helped me understand all my options.",
    author: "Anonymous",
  },
  {
    id: 6,
    text: "I'm so grateful for the support I received during a difficult time.",
    author: "Anonymous",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    // Determine how many testimonials to show based on screen size
    const handleResize = () => {
      const width = window.innerWidth
      let visibleCount = 4

      if (width < 640) {
        visibleCount = 1
      } else if (width < 1024) {
        visibleCount = 2
      }

      const visible: Testimonial[] = []
      for (let i = 0; i < visibleCount; i++) {
        const index = (currentIndex + i) % testimonials.length
        visible.push(testimonials[index])
      }

      setVisibleTestimonials(visible)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">What our customers say</h2>
        <div className="flex gap-2">
          <Button onClick={prevSlide} variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button onClick={nextSlide} variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-green-500 text-green-500" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.text}</p>
            <p className="font-semibold">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
