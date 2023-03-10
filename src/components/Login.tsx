import { useRouter } from 'next/router'
import { useState, type ChangeEvent, type FC } from 'react'
import { HiLockClosed } from 'react-icons/hi'
import { api } from '../utils/api'
import Link from 'next/link'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Orcas from '../../public/digitalorcas.jpg'
import Image from 'next/image'

const Login: FC = () => {
  const router = useRouter()

  const { mutate: login, error } = api.admin.login.useMutation({
    onSuccess: () => {
      router.push('/dashboard')
    }
  })

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <div className='login relative flex w-full flex-col'>
      <Link href='/'>
        <IoIosArrowRoundBack className='absolute -top-10 left-5 text-4xl text-gray-500 hover:text-gray-700' />
      </Link>
      <div className='flex w-full items-center justify-center '>
        <div className=' max-h-[700px] min-h-[500px]  w-full max-w-md rounded-lg border-8 border-slate-900 bg-gray-200 p-4 '>
          <div>
            <h2 className='text-center text-3xl font-bold text-gray-900'>Log in</h2>
          </div>
          <form className='flex flex-col justify-center space-y-8 '>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='space-y-8 font-bold shadow-sm'>
              <p className='pb-1 text-sm text-red-600'>{error && 'Invalid login credentials'}</p>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  value={input.email}
                  onChange={handleChange}
                  autoComplete='email'
                  required
                  className='relative block w-full appearance-none rounded-md border-2 border-black bg-transparent px-3 py-6 text-slate-900  placeholder-slate-700 focus:ring-2 '
                  placeholder='Email'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={input.password}
                  onChange={handleChange}
                  autoComplete='current-password'
                  required
                  className='focus:ring-none relative block w-full  rounded-md border-black bg-transparent px-2 py-6 text-slate-800 placeholder-slate-700'
                  placeholder='Password'
                />
              </div>

              <div className='px-2 pt-8'>
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault()
                    login(input)
                  }}
                  className='order group relative flex w-full justify-center rounded-md border-transparent bg-slate-900 py-2 text-lg font-medium text-white  hover:bg-opacity-90'
                >
                  Log in
                </button>
                <div className='flex flex-col items-center justify-center space-y-4 p-2'>
                  <p className=''>or</p>
                  <p className=''>Log in with</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
