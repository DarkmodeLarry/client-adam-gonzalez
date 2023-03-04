import { SelectedPage } from '../../shared/types'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Koi from '../../../public/yinYangBlue.png'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section
      id='home'
      className='hero scrollbar-hide hero w-full max-w-full items-center from-cyan-500 to-gray-800 pt-24 pb-16'
    >
      {/* IMAGE AND MAIN HEADER */}

      {/* HEADINGS */}

      <motion.div
        className='w-full'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        <h1 className='w-full justify-center pt-10 text-center text-[2.3rem] font-thin tracking-widest text-amber-500 md:text-5xl md:font-extralight'>
          Streamline Institute
        </h1>
      </motion.div>
      <div className='flex h-screen max-h-[600px] w-full flex-col justify-between pl-16 md:pl-64'>
        <motion.div className='' onViewportEnter={() => setSelectedPage(SelectedPage.Home)}>
          {/* MAIN HEADER */}
        </motion.div>
        {/* ACTIONS */}
        <motion.div
          className=''
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <AnchorLink className=''>
            <button className='cursor-pointer rounded-full border-8  border-gray-600 bg-gray-100 py-4 px-4 text-2xl font-semibold tracking-wider text-gray-700 transition-all duration-300 hover:rounded-xl hover:text-cyan-500 '>
              <p>Inquire Now</p>
            </button>
          </AnchorLink>
        </motion.div>
      </div>
    </section>
  )
}

export default Home
