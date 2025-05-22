"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
  icon?: React.ElementType
  target?: string
  rel?: string
}

const navItems: NavItem[] = [
  { label: "Help with Debt", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Customer Stories", href: "#" },
  { label: "Tips & Advice", href: "#" },
  { label: "Contact Us", href: "https://wa.me/916362966603?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services.", icon: MessageCircle, target: "_blank", rel: "noopener noreferrer" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-[64px] left-0 right-0 bg-white z-50 border-b shadow-md">
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-gray-700 hover:text-green-700 font-medium flex items-center"
                onClick={() => setIsOpen(false)}
                target={item.target}
                rel={item.rel}
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
