import dynamic from 'next/dynamic'
const LoginForm = dynamic(() => import('./LoginForm'), { ssr: false })

export default function SignInPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}