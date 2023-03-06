import { Button, Typography, Form, Input, Tooltip, Space, Row, Select } from 'antd'
import Link from 'next/link'

const UserLogin: React.FC = () => {
  const { Option } = Select

  interface DataNodeType {
    value: string
    label: string
    children?: DataNodeType[]
  }

  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        <Option value='1'>+1</Option>
      </Select>
    </Form.Item>
  )

  return (
    <div className='flex min-h-screen max-w-full flex-col items-center justify-center px-4'>
      <h1 className='m-2 text-3xl font-bold'>Sign In</h1>
      <div className='border[var(--black)] rounded-md border-[1px] p-4 shadow-xl drop-shadow-sm'>
        <Form
          form={form}
          name='register'
          layout='vertical'
          onFinish={onFinish}
          style={{ minWidth: 300, maxWidth: 450 }}
          scrollToFirstError
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail'
              },
              {
                required: true,
                message: 'Please input your E-mail'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <button
            type='submit'
            className='h-12 w-full rounded-xl bg-[var(--black)]  font-[var(--space)] uppercase tracking-widest text-[var(--white)]'
          >
            Log in
          </button>
        </Form>
        <div className='cursor-pointer pt-8'>
          <Link href='/register' className=' '>
            Not signed up? <strong>Sign Up</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
