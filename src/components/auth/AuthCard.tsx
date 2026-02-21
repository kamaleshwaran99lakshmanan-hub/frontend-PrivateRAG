import type { ReactNode } from 'react'
import Logo from '../layout/Logo'
import Input from '../ui/Input'
import Button from '../ui/Button'
import TextLink from '../ui/TextLink'

type AuthCardProps = {
  children?: ReactNode
}

function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <Logo />
        {children}
      </div>
    </div>
  )
}

function AuthCardLoginContent() {
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          autoComplete="email"
          aria-label="Email Address"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          aria-label="Password"
        />
      </div>
      <Button type="submit" variant="primary">
        Log In
      </Button>
      <div className="flex justify-center pt-1">
        <TextLink href="#">Forgot Password?</TextLink>
      </div>
    </form>
  )
}

export default AuthCard
export { AuthCardLoginContent }
