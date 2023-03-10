import { SelectedPage } from '../../shared/types'

import { motion } from 'framer-motion'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const About = ({ setSelectedPage }: Props) => {
  return (
    <section id='about' className='flex w-full flex-col  justify-center py-10 md:text-center'>
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.About)}>
        {/* HEADER */}
        {/* <motion.div
          className='bg-transparent text-center md:my-5'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <div className='flex flex-col items-center  justify-center  '>
            <div className=' mt-5'>
              <h2 className='text-3xl'>COACH ADAM</h2>
              <p className='text-md my-10 px-10 text-left  leading-8'>
                Introducing Adam Gonzales. <br />
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqequat. <br />
                Duis aute irure dolor cillum dolore eu fu cupidatat non proident, sunt in culpa qui
                officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className='flex h-64 w-96 flex-col items-center justify-center border-2 border-gray-900'>
              <p className='font-montserrat text-xl'>[Insert Badass Photo ]</p>
            </div>
          </div>
        </motion.div> */}

        {/* GRAPHICS AND DESCRIPTION */}
      </motion.div>
    </section>
  )
}

export default About
