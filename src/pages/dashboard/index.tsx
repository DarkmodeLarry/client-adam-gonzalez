import Link from 'next/link'
import { FC } from 'react'
import { api } from '../../utils/api'

const dashboard: FC = () => {
  const { mutate } = api.admin.sensitive.useMutation()

  return (
    <div className='flex min-h-screen max-w-full flex-col items-center bg-gray-100 p-5 '>
      <div className='flex w-full flex-col items-center justify-center rounded-lg bg-gray-200 shadow-2xl'>
        <h1 className='font-dmsans mt-5 text-center text-4xl font-semibold tracking-wide text-gray-600'>
          DASHBOARD
        </h1>
        <div className='my-44 mt-10 flex h-full w-full flex-col items-center justify-center gap-10'>
          <Link className='adminBtn' href='/dashboard/opening'>
            Opening Hours
          </Link>
          <Link className='adminBtn adminBtnText' href='/dashboard/menu'>
            Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default dashboard
