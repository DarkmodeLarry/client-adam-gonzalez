import { SelectedPage } from '../../shared/types'
import Private from '../../../public/Adam.png'
import Intro from '../../../public/introclass.jpg'
// import HandsOn from '../../../public/handsOn.jpg'
import team from '../../../public/group.png'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

const TrainingOptions = ({ setSelectedPage }: Props) => {
  return (
    <>
      <section id='options' className='flex min-h-screen w-full flex-col bg-gray-700 pb-10'>
        <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.TrainingOptions)}>
          <p className='py-10 text-center text-3xl font-black text-gray-300 lg:text-4xl'>
            Training Menu:
          </p>
        </motion.div>

        <motion.div
          className='flex h-full w-full justify-center'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <div className='flex flex-col items-center justify-center space-y-8 text-xs'>
            {/* card */}
            {/* Header */}
            <div className='flex w-[600px] flex-col '>
              <div className='flex h-10 w-full items-center justify-center gap-8 rounded-t-xl bg-gray-300 text-center'>
                <p className=' text-gray-600'>Private Lessons</p>
                <p className='text-xs text-amber-600'>with Adam Gonzales</p>
              </div>
              {/* Header */}

              {/* Image */}
              <div className='flex rounded-b-xl border-2 border-r-2 border-gray-500  '>
                <div className='flex w-2/6 items-center justify-center rounded-bl-lg border-2 border-gray-500 bg-cyan-900'>
                  <Image src={Private} alt='Private' height={150} width={150} className='' />
                </div>
                {/* Image */}
                {/* Content */}
                <div className='flex w-4/6 flex-col border-2 border-gray-500 px-8 pt-3'>
                  <div className='font-dmsans text-xs text-gray-400'>
                    <p className=''>All ages & skill level</p>
                    <p className=' font-dmsans text-xs '>GoPro session + detailed analysis</p>
                    <p className=' text-left text-white'>Special Packages upon request</p>
                  </div>
                  <div className='flex items-center justify-between pt-3'>
                    <p className='flex text-left text-xs text-gray-300'>One on One (1 swimmer)</p>
                    <div className='flex gap-4'>
                      <span className=' price text-green-600'>$100/h</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-1'>
                    <p className='text-left text-xs text-gray-300'>Private Group (2-3 swimmers)</p>
                    <div className='flex gap-4'>
                      <span className=' price text-green-600'>$100/h</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between pt-1'>
                    <p className='pb-2 text-left text-xs text-gray-300'>
                      Private Group (4+ swimmers)
                    </p>
                    <div className='flex gap-4'>
                      <span className='price text-green-600'>$100/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            {/* card */}
            <div className='mb-8 flex w-[600px] flex-col '>
              <div className='flex h-10 w-full items-center justify-center gap-8 rounded-t-xl bg-gray-300'>
                <p className=' text-gray-600'>Introductory Class</p>
                <p className='text-xs text-amber-600'>Consultation</p>
              </div>
              {/* Header */}

              {/* Image */}
              <div className='flex w-full rounded-b-xl border-2 border-r-2 border-gray-500  '>
                <div className='flex w-2/6 items-center justify-center  rounded-bl-lg border-2 border-gray-500 bg-cyan-900 p-1 '>
                  <Image
                    src={Intro}
                    alt='Private'
                    height={200}
                    width={200}
                    className='rounded-bl-lg'
                  />
                </div>
                {/* Image */}
                {/* Content */}

                <div className='flex w-4/6 flex-col border-2 border-gray-400 px-8'>
                  <h4 className='flex pt-2 text-gray-300'>Consultation</h4>
                  <div className='py-2 font-dmsans text-xs text-gray-400'>
                    <p className=''>Assessment</p>
                    <p className=''>Goal setting</p>
                    <p className=' font-dmsans text-xs '>Personalized workout + plan</p>
                    <p className='py-2 text-left text-white'></p>
                  </div>

                  <div className='flex w-full items-center justify-between '>
                    <p className='text-gray-200'>Per swimmer</p>
                    <div className='flex justify-center gap-4 text-xs'>
                      <span className='price   text-green-600'>$75/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* card */}
            <div className='flex w-[600px] flex-col  border-white pt-2 pb-8'>
              <div className='flex h-10 w-full items-center justify-center gap-8 rounded-t-xl bg-gray-300'>
                <p className=' text-gray-600'>Group Class</p>
                <p className='text-xs text-amber-600'>Semi Private</p>
              </div>
              {/* Header */}

              {/* Image */}
              <div className='flex w-full  rounded-b-xl border-2 border-r-2 border-gray-500 '>
                <div className='flex w-2/6 items-center justify-center rounded-bl-xl border-2 border-gray-500 bg-cyan-900 p-1'>
                  <Image
                    src={team}
                    alt='Private'
                    height={200}
                    width={200}
                    className='rounded-bl-lg'
                  />
                </div>
                {/* Image */}
                {/* Content */}

                <div className='flex w-4/6 flex-col rounded-br-xl border-2 border-gray-400 px-8'>
                  <h4 className='flex items-center pt-2 text-gray-300'>Group Training</h4>
                  <div className='py-2 font-dmsans text-xs text-gray-400'>
                    <p className=''>Novice level+</p>
                    <p className=''>Semi Private Training is tailored to group's level and goals</p>
                    <p className=' font-dmsans text-xs '>Enjoy with families and/or friends</p>
                  </div>

                  <div className='flex w-full justify-between '>
                    <p className='text-gray-200'>Per swimmer</p>
                    <div className='flex justify-center gap-4 text-xs'>
                      <span className='text-gray-200'>MWF</span>
                      <span className=' price text-green-500'>
                        $80/m <br />
                        <span className='text-center font-light text-gray-400'>or</span> <br />{' '}
                        $15/day
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default TrainingOptions
