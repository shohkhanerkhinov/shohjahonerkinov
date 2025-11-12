"use client"

import Link from "next/link"
import React from "react"

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function ProtectedLink({
  href,
  children,
  className,
  onClick,
}: ProtectedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault() // linkni darhol ochmasin
      onClick(e) // avval click funksiyasini bajarsin
      window.open(href, "_blank") // keyin yangi oynada ochsin
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
