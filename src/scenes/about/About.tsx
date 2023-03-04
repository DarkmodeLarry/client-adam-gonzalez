import { SelectedPage } from '../../shared/types'
import { motion } from 'framer-motion'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const childVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 }
}

type Props = {
  icon: JSX.Element
  title: string
  description: string
  setSelectedPage: (value: SelectedPage) => void
}

const Abouts = ({ icon, title, description, setSelectedPage }: Props) => {
  return (
    <motion.div
      variants={childVariant}
      className='py- mt-5 max-w-sm rounded-md border-2 border-gray-400 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-800 via-cyan-400 to-gray-800 px-1 text-center'
    >
      <h4 className='font-bold'>{title}</h4>
      <p className='my-8 px-6 text-sm text-gray-300'>{description}</p>
      <AnchorLink
        className='hover:text-secondary-500 text-xs font-bold underline'
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        <div className='flex w-full items-center justify-center '>
          <p className='flex h-10 w-36  items-center justify-center whitespace-nowrap rounded-lg bg-gray-200 font-montserrat font-semibold text-gray-900 shadow-2xl shadow-gray-500 transition-all hover:translate-y-1 hover:border-2 hover:border-gray-200 hover:bg-gray-700 hover:text-gray-200 hover:shadow-md hover:shadow-gray-400  active:scale-95'>
            Learn More
          </p>
          <p>
            Swimming has blessed me with a life with I wish I could share with everyone. Facing and
            overcoming challenges this sport has provided for me has shaped me to be humble,
            open-minded, that have carved to enjoy my life with great health, , social, and
            confident. . Swimmers know swimmers. We know we are tough.
          </p>
        </div>
      </AnchorLink>
    </motion.div>
  )
}

export default Abouts
