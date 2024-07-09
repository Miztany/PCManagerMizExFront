'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import styles from './signin.module.css'


export default function SignInPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}

export const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [employeeNum, setEmployeeNum] = useState('')
  const [password, setPassword] = useState('')

  const borderClass = searchParams.get('error') ? styles.borderError : ''

  const onSubmit = async (event) => {
    event.preventDefault()

    const callbackUrl = searchParams.get('callbackUrl') || '/'


    try {
      const response = await signIn('credentials', {
        redirect: true,
        employeeNum,
        password,
        callbackUrl,
      })
      if (response?.error) {
        console.log(response.error)
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <h1>ログイン</h1>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <th><label>社員番号</label></th>
              <td><input
                required
                type="text"
                id="employeeNum"
                value={employeeNum}
                name='employeeNum'
                onChange={(event) => setEmployeeNum(event.target.value)}
                className={borderClass}
              /></td>
            </tr>
            <tr>
              <th><label>パスワード</label></th>
              <td><input
                required
                type="password"
                id="password"
                name='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={borderClass}
              /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}