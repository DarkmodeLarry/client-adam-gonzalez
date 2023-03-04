import Link from 'next/link'
import type { FC } from 'react'
import Dolphins from '../../../public/dolphins.png'
import Image from 'next/image'
import { AiOutlineSchedule } from 'react-icons/ai'
import { IoMdTimer } from 'react-icons/io'
import { RiDashboardLine } from 'react-icons/ri'

const dashboard: FC = () => {
  return (
    <div className='relative flex h-screen max-w-full flex-col items-center justify-center bg-gray-300'>
      <div className='fixed top-0 flex h-16 w-full items-center justify-end border-2'>
        <div className='mr-4 h-12 w-12 rounded-full border-2 border-blue-400'></div>
      </div>
      <div className='fixed left-0 flex h-full w-[300px] flex-col items-center bg-gray-300 text-gray-100 shadow-2xl shadow-gray-600 '>
        <div className='w-full py-2 text-center '>
          <Image src={Dolphins} alt='dolphins' width={100} height={100} className='py-6 pl-4' />

          <div className='flex w-full items-center justify-center gap-1 rounded-md border-2 border-gray-600 bg-gray-700 py-6 text-2xl tracking-wide  shadow-lg shadow-gray-800'>
            <RiDashboardLine />
            <h2 className='font-semibold text-amber-500'>Dashboard</h2>
          </div>
        </div>

        <div className='mt-6 flex h-full  w-full flex-col items-center space-y-2 pl-2 text-lg font-medium tracking-wider md:text-center'>
          <div className=' flex h-16 w-full items-center gap-6 text-left transition-all duration-150 hover:scale-95 hover:drop-shadow-xl '>
            <div className='flex h-12 items-center justify-end pl-2 '>
              <IoMdTimer className='text-right text-2xl text-amber-500' />
            </div>
            <div className='flex h-12 items-center '>
              <Link className='text-left tracking-widest' href='/dashboard/opening'>
                Opening Hours
              </Link>
            </div>
          </div>
          <div className='flex h-12 w-full items-center gap-6 text-left font-semibold transition-all duration-150 hover:scale-95 hover:drop-shadow-xl'>
            <div className='flex h-12 items-center justify-end pl-2 '>
              <AiOutlineSchedule className=' text-right text-2xl text-amber-500 ' />
            </div>
            <div className='flex h-14 items-center '>
              <Link className='text-left tracking-widest' href='/dashboard/menu'>
                Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboard
