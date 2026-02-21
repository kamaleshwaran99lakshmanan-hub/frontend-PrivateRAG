import type { AnchorHTMLAttributes, ReactNode } from 'react'

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

function TextLink({ href, children, className = '', ...props }: TextLinkProps) {
  return (
    <a
      href={href}
      className={`text-sm text-gray-500 hover:text-gray-700 transition-colors ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

export default TextLink
