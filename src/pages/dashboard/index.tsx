import Link from 'next/link'
import type { FC } from 'react'
import Dolphins from '../../../public/dolphins.png'
import Image from 'next/image'
import { AiOutlineSchedule } from 'react-icons/ai'
import { IoMdTimer } from 'react-icons/io'
import { RiDashboardLine } from 'react-icons/ri'

const dashboard: FC = () => {
  return (
    <div className='relative flex h-screen max-w-full flex-col items-center justify-center bg-gray-400 text-sm'>
      <Link href='/api/auth/logout'>
        <p>Logout</p>
      </Link>
      <div className='flex items-center bg-gray-300 p-4 text-gray-100 shadow-2xl shadow-gray-600 '>
        <div className='w-full py-2 text-center '>
          <Image src={Dolphins} alt='dolphins' width={100} height={100} className='py-6 pl-4' />

          <div className='flex w-full items-center justify-center gap-1 rounded-md border-2 border-gray-400 bg-gray-700 py-6 text-2xl tracking-wide  shadow-inner shadow-gray-800'>
            <RiDashboardLine />
            <h2 className='font-semibold text-amber-500'>Dashboard</h2>
          </div>
        </div>

        <div className='textlg mt-6 flex h-full w-full flex-col items-center justify-evenly space-y-2 pl-2 text-lg font-medium tracking-wider md:text-center'>
          <div className='flex h-16 w-full items-center gap-6 rounded-xl bg-slate-600 text-left shadow-xl shadow-gray-800 transition-all duration-150 hover:scale-95 hover:drop-shadow-xl '>
            <div className='flex h-12 items-center justify-end pl-2 '>
              <IoMdTimer className='text-right text-2xl text-amber-500' />
            </div>
            <div className='text-md flex h-12 items-center'>
              <Link className='text-left tracking-widest text-gray-300' href='/dashboard/opening'>
                Opening Hours
              </Link>
            </div>
          </div>
          <div className='flex h-12 w-full items-center gap-6 rounded-xl bg-slate-600 py-6 text-left font-semibold shadow-xl shadow-gray-800 transition-all duration-150 hover:scale-95 hover:drop-shadow-xl'>
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
