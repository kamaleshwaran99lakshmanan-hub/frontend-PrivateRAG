import { Shield } from 'lucide-react'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#385B7E] text-white">
        <Shield className="h-5 w-5" aria-hidden />
      </div>
      <span className="text-xl font-semibold tracking-tight text-gray-800">
        SecureRAG
      </span>
    </div>
  )
}

export default Logo
