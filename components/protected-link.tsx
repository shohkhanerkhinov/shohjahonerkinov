"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import SecurityModal from "./security-modal"
import { ExternalLink } from "lucide-react"

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ProtectedLink({ href, children, className = "" }: ProtectedLinkProps) {
  const { user } = useAuth()
  const [showSecurityModal, setShowSecurityModal] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      setShowSecurityModal(true)
    }
  }

  return (
    <>
      <a
        href={user ? href : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        {children}
        <ExternalLink size={16} />
      </a>
      {showSecurityModal && <SecurityModal onClose={() => setShowSecurityModal(false)} />}
    </>
  )
}
