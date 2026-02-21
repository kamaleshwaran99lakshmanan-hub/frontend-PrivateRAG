import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
  icon?: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#385B7E] text-white hover:bg-[#2d4a66] focus:ring-blue-600/40 disabled:opacity-50 disabled:pointer-events-none',
  secondary:
    'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 focus:ring-gray-400/40',
}

function Button({
  variant = 'primary',
  type = 'button',
  children,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 w-full'
  const styles = variantStyles[variant]

  return (
    <button
      type={type}
      className={`${base} ${styles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
