import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { Menu } from 'react-feather'
import useMediaQuery from '../../hooks/useMediaQuery'
import { type SelectedPage } from '../../shared/types'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSwim } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { BsCalendarPlus } from 'react-icons/bs'

type Props = {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}
const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const navbarBackground = isTopOfPage
    ? ''
    : ' w-full flex justify-center items-center transition-all duration-200 h-16 text-slate-900 mt-4 rounded-lg '

  useEffect(() => {
    const list = document.querySelectorAll('.bottomNav li')

    const activeLink = function (this: HTMLElement) {
      list.forEach((item) => {
        item.classList.remove('active')
      })
      this.classList.add('active')
    }

    list.forEach((item) => item.addEventListener('click', activeLink))
  }, [])

  return (
    <nav className='navbar relative w-full '>
      <div
        className={`${navbarBackground} fixed top-0 z-30 flex h-16 w-full flex-nowrap items-center justify-between bg-[var(--black)] bg-opacity-80 text-gray-100`}
      >
        {/* LEFT SIDE */}
        <div className='hidden'>
          <h2 className='pl-2 uppercase text-[var(--white)]'>streamline</h2>
        </div>

        {/* MIDDLE  */}

        <div className='flex w-full items-center justify-center'>
          <div
            className={`flex w-full items-center justify-center space-x-4 text-sm text-gray-400 `}
          >
            <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <div className='hidden md:block'>
              <NavLink
                page='Training Options'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
            <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <NavLink
              page='Contact Us'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <div className='hidden border-2 border-transparent p-2 transition-all duration-150 hover:rounded-xl hover:border-2 hover:border-white hover:text-yellow-400 md:flex'>
              <NavLink
                page='Calendar'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </div>
          </div>
          <div className='mr-2 flex w-20 flex-col items-center justify-center rounded-lg border-2 py-1 px-2 text-gray-200 transition-all duration-150 hover:border-cyan-600  hover:bg-[var(--black)] hover:font-semibold hover:text-cyan-500'>
            <Link href='/login' className='inline-block text-xs'>
              Sign In
            </Link>
          </div>
        </div>

        {/* Pop up Mobile Nav */}
        <div className='fixed bottom-0 flex h-16 min-w-full flex-col items-center justify-center'>
          <div className='fixed right-1/2 bottom-14 z-50 flex w-full translate-x-1/2  items-center justify-center font-medium uppercase'>
            <button
              className='rounded-full border-2 bg-gray-700 p-3 shadow-xl shadow-gray-600  transition-all duration-200 hover:scale-95 '
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Menu className='h-6 w-6 rounded-full  text-cyan-600 ' />
            </button>
          </div>
          <div className='relative h-full w-full'>
            <ul className='bottomNav  flex h-full w-full items-center justify-evenly  text-sm'>
              <li className='active ' onClick={() => setActive(!active)}>
                <span className='icon'>
                  <AiOutlineHome className='h-6 w-6' />
                </span>
                <span className='iconText'>Home</span>
              </li>
              <li className='cursor-pointer' onClick={() => setActive(!active)}>
                <span className='icon'>
                  <BiSwim className=' h-6 w-6' />
                </span>
                <span className='iconText'>Training</span>
              </li>

              <li className='cursor-pointer' onClick={() => setActive(!active)}>
                <span className='icon'>
                  <BsCalendarPlus className='h-6 w-6' />
                </span>
                <span className='iconText'>Schedule</span>
              </li>
              <li className='cursor-pointer' onClick={() => setActive(!active)}>
                <span className='icon'>
                  <FaRegUserCircle className='h-6 w-6' />
                </span>
                <span className='iconText'>Profile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className='fixed right-0 bottom-0 z-40 h-full w-[200px] bg-[#e7e7e7] font-semibold text-[var(--black)]  '>
          {/* CLOSE ICON */}
          <div className='mb-10 mr-8 flex justify-end'>
            <div className='mt-8'>
              <button
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                className='rounded-full border-2 bg-gray-700 p-1 shadow-md shadow-gray-500 transition-all duration-200 ease-out hover:scale-95  hover:border-yellow-400'
              >
                <Menu className='h-12 w-12 rounded-full p-2  text-yellow-400 ' />
              </button>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className='flex flex-col gap-10 p-8 text-sm'>
            <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <NavLink
              page='TrainingOptions'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <NavLink
              page='Calendar'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <NavLink
              page='Contact Us'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link href='/login' className=''>
              <p className='px-3 py-2 transition-all hover:rounded-2xl hover:border-2 hover:text-yellow-400'>
                Sign In
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
