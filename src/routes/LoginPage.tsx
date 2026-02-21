import AuthCard, { AuthCardLoginContent } from '../components/auth/AuthCard'

function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(191,219,254,0.35),transparent_70%)]"
        aria-hidden
      />
      <div className="relative w-full max-w-md">
        <AuthCard>
          <AuthCardLoginContent />
        </AuthCard>
      </div>
    </div>
  )
}

export default LoginPage
