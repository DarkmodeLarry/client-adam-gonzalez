import React, { useState } from 'react'
import NavLink from './NavLink'
import { GiDolphin } from 'react-icons/gi'
import Koi from '../../../public/yinYangBlue.png'
import Avatar from '../../../public/mike.png'
import { Menu, Calendar } from 'react-feather'
import useMediaQuery from '../../hooks/useMediaQuery'
import { type SelectedPage } from '../../shared/types'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}
const Header = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = 'flex items-center justify-between'
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const navbarBackground = isTopOfPage
    ? ''
    : 'bg-black rounded-full w-full flex justify-center items-center mt-4 transition-all duration-200 h-20 text-gray-100'
  return (
    <nav>
      <div
        className={`${navbarBackground} fixed top-0 z-30 flex h-24 w-full flex-nowrap items-center justify-between bg-black px-5`}
      >
        {/* LEFT SIDE */}
        <div className='items-left flex basis-3/12 items-center justify-center gap-4 font-montserrat'>
          {/* <Image alt='home-pageGraphic' priority src={Koi} className='max-w-[100px]  ' /> */}

          <p className='font-montserrat text-sm text-white'>
            <span className='text-sm text-gray-400'>with </span> Coach Adam
          </p>
          <Image
            alt='home-pageGraphic'
            priority
            src={Koi}
            height={75}
            width={75}
            className='  max-w-[100px]'
          />
        </div>

        {/* MIDDLE  */}
        {isAboveMediumScreens ? (
          <div className='flex w-full items-center justify-end'>
            <div
              className={`font-md text-md flex w-full basis-7/12 items-center gap-8 font-dmsans text-gray-300 `}
            >
              <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              <NavLink
                page='Options'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <NavLink page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              <NavLink
                page='Contact Us'
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
              <div className='flex gap-4 font-semibold text-gray-200'>
                <Link href='/login' className={`${flexBetween} gap-8`}>
                  <p className='px-3 py-2 font-semibold transition-all hover:rounded-2xl hover:border-2 hover:text-yellow-400 hover:shadow-2xl'>
                    Sign In
                  </p>
                </Link>

                <div className='flex gap-3 border-2 border-transparent p-2 transition-all duration-150 hover:rounded-xl hover:border-2 hover:border-white hover:text-yellow-400'>
                  <NavLink
                    page='Calendar'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Calendar />
                </div>
              </div>
            </div>
            <div className='flex w-full basis-3/12 justify-end'>
              <div className='flex items-center gap-2 rounded-full bg-gradient-to-br from-gray-500 via-gray-400 to-gray-500 p-1'>
                <Image src={Avatar} alt='avatar' height={55} width={55} className=' ' />
                <p className='bg-gray-00 font-montserrat font-thin tracking-wider text-white'>
                  Welcome Back, <span className='font-semibold text-amber-500'>Mike</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-4 rounded-full bg-gradient-to-br from-gray-500 via-gray-400 to-gray-500 px-1 py-1'>
            <button
              className='rounded-full  bg-gray-700 p-1 drop-shadow-lg transition-all duration-200 hover:scale-95 '
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Menu className='h-10 w-10 rounded-full  text-cyan-600 ' />
            </button>
            <Image src={Avatar} alt='avatar' height={55} width={55} className=' rounded-full' />
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
          <div className='raleway ml-[33%] flex flex-col gap-10  text-xl '>
            <NavLink page='Home' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
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
            <Link href='/login' className={`${flexBetween} `}>
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

export default Header
