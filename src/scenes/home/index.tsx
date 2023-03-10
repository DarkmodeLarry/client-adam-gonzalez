import { SelectedPage } from '../../shared/types'
import Stream from '../../../public/streamglass.png'
import { motion } from 'framer-motion'
import Image from 'next/image'
type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const Home = ({ setSelectedPage }: Props) => {
  return (
    <section id='home' className='hero mt-4 h-full max-w-full bg-[#e7e7e7]'>
      <motion.div className='px-4' onViewportEnter={() => setSelectedPage(SelectedPage.Home)}>
        {/* IMAGE AND MAIN HEADER */}

        {/* HEADINGS */}

        <div className='py-14 pl-4'>
          <h1 className='pt-8 pb-8 text-2xl font-semibold tracking-widest text-cyan-500'>
            Adam Gonzales
          </h1>
          <div className='flex justify-between pr-4'>
            <div className=''>
              <h2 className=''>Personal Swim Training</h2>
              <p className='text-l my-4'>Train like a pro</p>
            </div>
            <Image src={Stream} alt='Stream' width={200} height={100} />
          </div>
        </div>
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
          <button className='mb-8 ml-4 cursor-pointer rounded-full border-2 border-gray-400  bg-gradient-to-br from-cyan-900 to-cyan-600 py-2 px-2 text-lg tracking-wider  transition-all duration-200 '>
            <p>Inquire Now</p>
          </button>
        </motion.div>
      </motion.div>

      {/* ACTIONS */}
    </section>
  )
}

export default Home
