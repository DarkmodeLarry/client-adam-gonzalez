import { SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Hero = ({ setSelectedPage }: Props) => {
  return (
    <section id='hero' className='hero var(--centeredTop)'>
      <motion.div
        className=' mt-20 px-8'
        onViewportEnter={() => setSelectedPage(SelectedPage.Hero)}
      >
        {/* IMAGE AND MAIN HEADER */}

        {/* HEADINGS */}

        <div className=''>
          <h1>Personal Swimming Coach</h1>
          <p className='py-4 pl-8 text-3xl'>.</p>
        </div>
      </motion.div>
      {/* ACTIONS */}

      <motion.div
        className='flex w-full justify-start md:justify-end'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 }
        }}
      >
        <button className='cursor-pointer rounded-full border-4 border-gray-600  bg-gradient-to-br  from-gray-500 via-gray-400 to-gray-500 py-2 px-2 text-xl tracking-wider  transition-all duration-200 '>
          <p>Inquire Now</p>
        </button>
      </motion.div>
    </section>
  )
}

export default Hero
