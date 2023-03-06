import { Button, Typography, Form, Input, Tooltip, message, Space, Row, Select } from 'antd'
import Link from 'next/link'
import { CreateUser } from '../../apicalls/users'

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await CreateUser(values)
      if (response.success) {
        message.success(response.message)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(response.message)
    }
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center px-4'>
      <h1 className='m-2 text-3xl font-bold'>Register</h1>
      <div className='border[var(--black)] rounded-md border-[1px] p-4 shadow-xl drop-shadow-sm'>
        <Form layout='vertical' onFinish={onFinish} style={{ minWidth: 300, maxWidth: 450 }}>
          <Form.Item name='email' label='Email'>
            <input type='email' />
          </Form.Item>

          <Form.Item name='name' label='Name'>
            <input type='name' />
          </Form.Item>

          <Form.Item name='password' label='Password'>
            <input type='password' />
          </Form.Item>

          <button
            type='submit'
            className='h-12 w-full rounded-xl bg-[var(--black)]  font-[var(--space)] uppercase tracking-widest text-[var(--white)]'
          >
            Register
          </button>
        </Form>
        <div className='cursor-pointer pt-8'>
          <Link href='/userlogin' className=' '>
            Already signed up? <strong>Log in</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
