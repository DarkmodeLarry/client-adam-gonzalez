import { SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Hero = ({ setSelectedPage }: Props) => {
  return (
    <section id='hero' className='hero mt-4 h-full max-w-full bg-[#e7e7e7]'>
      <motion.div className='' onViewportEnter={() => setSelectedPage(SelectedPage.Hero)}>
        {/* IMAGE AND MAIN HEADER */}

        {/* HEADINGS */}

        <div className='mt-14 pl-10'>
          <h1 className='my-10 pt-10 text-2xl font-semibold text-cyan-600'>
            Adam <span className='text-[var(--black)]'>Gonzales</span>
          </h1>
          <h2 className='mt-2'>Personal Swim Instructor.</h2>
          <p className='my-4 text-xl'>Elite swim training for everyone.</p>
        </div>
      </motion.div>
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
        <button className='ml-10 cursor-pointer rounded-full border-2 border-gray-400  bg-gradient-to-br from-cyan-900 via-gray-300 to-cyan-600 py-2 px-2 text-lg tracking-wider  transition-all duration-200 '>
          <p>Inquire Now</p>
        </button>
      </motion.div>
      <div className='my-6 w-full bg-gray-400'>
        <video className='video' width='500' height='500' autoPlay muted loop>
          <source src='/videos/streamline.mp4' type='video/mp4' />
        </video>
      </div>

      {/* ACTIONS */}
    </section>
  )
}

export default Hero
