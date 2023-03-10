import Link from 'next/link'
import type { FC } from 'react'
import Dolphins from '../../../public/dolphins.png'
import Image from 'next/image'
import { AiOutlineSchedule } from 'react-icons/ai'
import { IoIosArrowRoundBack, IoMdTimer } from 'react-icons/io'
import { RiDashboardLine } from 'react-icons/ri'

const dashboard: FC = () => {
  return (
    <div className='relative flex h-screen max-w-full flex-col items-center bg-gray-400 pt-10 text-sm'>
      <Link href='/'>
        <IoIosArrowRoundBack className='absolute -top-10 left-5 text-4xl text-gray-500 hover:text-gray-700' />
      </Link>
      <div className='flex w-full flex-col items-center bg-gray-300 p-8 text-gray-100 shadow-2xl shadow-gray-600 '>
        <div className='w-full py-2 text-center '>
          <div className='flex w-full items-center justify-center gap-1 rounded-md border-2 border-gray-400 bg-gray-700 py-6 text-2xl tracking-wide  shadow-inner shadow-gray-800'>
            <RiDashboardLine />
            <h2 className='font-semibold text-amber-500'>Dashboard</h2>
            <Image src={Dolphins} alt='dolphins' width={100} height={100} className=' pl-8' />
          </div>
        </div>

        <div className='mt-6 flex h-full w-full flex-col space-y-6  font-medium tracking-wider '>
          <Link
            className='flex h-12 w-1/2 items-center justify-start gap-6 rounded-xl bg-slate-600 py-4 px-2 pl-2 text-left tracking-widest shadow-xl shadow-gray-800 transition-all duration-150 hover:scale-95'
            href='/dashboard/opening'
          >
            <IoMdTimer className='text-right text-2xl text-amber-500' />
            Availability
          </Link>

          <Link
            className='flex h-12 w-1/2 items-center justify-start gap-4 rounded-xl bg-slate-600 py-4 px-2 pl-2 text-left tracking-widest shadow-xl shadow-gray-800 transition-all duration-150 hover:scale-95'
            href='/dashboard/menu'
          >
            <AiOutlineSchedule className=' text-right text-2xl text-amber-500 ' />
            Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default dashboard
