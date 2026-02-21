import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${className}`}
      {...props}
    />
  )
}

export default Input
