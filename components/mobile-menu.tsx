"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Help with Debt", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Customer Stories", href: "#" },
  { label: "Tips & Advice", href: "#" },
  { label: "Contact Us", href: "#" },
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
                className="py-2 text-gray-700 hover:text-green-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
