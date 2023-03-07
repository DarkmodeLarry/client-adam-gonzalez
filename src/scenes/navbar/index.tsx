import React, { useEffect, useState } from 'react'
import NavLink from './NavLink'
import Koi from '../../../public/yinYangBlue.png'
import { Menu } from 'react-feather'
import useMediaQuery from '../../hooks/useMediaQuery'
import { type SelectedPage } from '../../shared/types'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSwim } from 'react-icons/bi'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
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
    : ' w-full flex justify-center items-center transition-all duration-200 h-16 text-slate-900 bg-[var(--black)] bg-opacity-95 mt-4 '

  let list = document.querySelectorAll('.navigation Link')

  function activeLink(this: HTMLElement) {
    list.forEach((item) => {
      item.classList.remove('active')
    })
    this.classList.add('active')
  }

  list.forEach((item) => item.addEventListener('click', activeLink))

  return (
    <nav className='navbar relative w-full '>
      <div
        className={`${navbarBackground} text--900 fixed top-0 z-30 flex h-16  w-full flex-nowrap items-center justify-between`}
      >
        {/* LEFT SIDE */}
        <div className='flex basis-1/12 items-center justify-center'>
          <h2 className='uppercase text-[var(--white)]'>streamline</h2>
        </div>

        {/* MIDDLE  */}
        {isAboveMediumScreens ? (
          <div className='flex w-full items-center justify-center'>
            <div
              className={`font-sm flex w-full basis-10/12 items-center justify-center space-x-8  `}
            >
              <NavLink page='Hero' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              <NavLink
                page='Training Options'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              <NavLink
                page='Contact Us'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <div className='flex border-2 border-transparent p-2 transition-all duration-150 hover:rounded-xl hover:border-2 hover:border-white hover:text-yellow-400'>
                <NavLink
                  page='Calendar'
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              </div>
            </div>
            <div className=''>
              <Link href='/login' className=''>
                <p className='text-lg font-semibold transition-all hover:rounded-2xl hover:border-2 hover:text-cyan-400 hover:shadow-2xl'>
                  Sign In
                </p>
              </Link>
              <div className='flex w-full items-center justify-center gap-4 rounded-full bg-gradient-to-br from-gray-500 via-gray-400 to-gray-500 px-1 py-1'>
                <p>streamline</p>
                <button
                  className='rounded-full  bg-gray-700 p-1 drop-shadow-lg transition-all duration-200 hover:scale-95 '
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Menu className='h-8 w-8 rounded-full  text-cyan-600 ' />
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Nav
          <div className='fixed bottom-0 flex h-20 min-w-full flex-col items-center justify-center'>
            <div className='relative h-full w-full'>
              <div className='fixed right-28 top-4 flex translate-x-1/2  items-center justify-center font-medium uppercase'>
                <p className='px-4 text-lg  font-[var(--space)] text-[var(--black)]'>streamline</p>
                <button
                  className='rounded-full border-2 bg-gray-700 p-1 drop-shadow-lg transition-all duration-200 hover:scale-95 '
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Menu className='h-6 w-6 rounded-full  text-cyan-600 ' />
                </button>
              </div>
              <ul className='navigation  flex h-full w-full items-center justify-between bg-[var(--black)] px-4 text-sm'>
                <li className='active'>
                  <a className='flex flex-col items-center justify-center' href='#'>
                    <span className='icon'>
                      <AiOutlineHome className='h-6 w-6' />
                    </span>
                    <span className='text'>Home</span>
                  </a>
                </li>
                <li>
                  <a className='flex flex-col items-center justify-center' href='#'>
                    <span className='icon'>
                      <BiSwim className=' h-6 w-6' />
                    </span>
                    <span className='text'>Training</span>
                  </a>
                </li>

                <li>
                  <a className='flex flex-col items-center justify-center' href='#'>
                    <span className='icon'>
                      <BsCalendarPlus className='h-6 w-6' />
                    </span>
                    <span className='text'>Schedule</span>
                  </a>
                </li>
                <li>
                  <a className='flex flex-col items-center justify-center' href='#'>
                    <span className='icon'>
                      <FaRegUserCircle className='h-6 w-6' />
                    </span>
                    <span className='text'>Profile</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className='fixed right-0 bottom-0 z-40 h-full w-[300px] bg-gray-900 text-white  '>
          {/* CLOSE ICON */}
          <div className='mb-10 mr-8 flex justify-end'>
            <div className='mt-8'>
              <button
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                className='rounded-full border-4 border-gray-700 bg-gray-100 p-2 shadow-md shadow-gray-500 transition-all duration-200 ease-out hover:scale-95 hover:border-4 hover:border-yellow-400'
              >
                <Menu className='h-12 w-12 rounded-full p-2  text-yellow-400 ' />
              </button>
            </div>
          </div>

          {/* MENU ITEMS */}
          <div className='ml-[33%] flex flex-col gap-10  text-xl '>
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
