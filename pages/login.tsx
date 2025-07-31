import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

const LoginPage = () => {
  const router = useRouter()
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      router.push('/admin')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await login(email, password)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='font-sans flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black text-black dark:text-white px-4'>
      <div className='w-full max-w-sm text-center'>
        <h1 className='text-lg font-normal tracking-widest uppercase mb-8 md:mb-12'>
          LOG IN
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='E-MAIL'
            required
            className='w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-sm tracking-wider placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-widest focus:outline-none focus:border-black dark:focus:border-white transition-colors'
          />
          <input
            id='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='PASSWORD'
            required
            className='w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 text-sm tracking-wider placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-widest focus:outline-none focus:border-black dark:focus:border-white transition-colors'
          />

          {error && (
            <p className='text-xs text-red-500 tracking-widest pt-2'>{error}</p>
          )}

          <div className='text-xs tracking-wider text-gray-500 text-right pt-2'>
            <a
              href='#'
              className='hover:text-black dark:hover:text-white transition'
            >
              FORGOT YOUR PASSWORD?
            </a>
          </div>

          <div className='pt-6'>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-black text-white py-3.5 text-xs font-normal tracking-widest uppercase hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-300'
            >
              {isLoading ? 'LOGGING IN...' : 'LOG IN'}
            </button>
          </div>
        </form>

        <div className='mt-8 text-xs tracking-wider text-gray-500'>
          <a
            href='#'
            className='hover:text-black dark:hover:text-white transition'
          >
            NEED AN ACCOUNT? REGISTER
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
