import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { HiArrowLeft } from 'react-icons/hi'
import Select from 'react-select'
import { SingleValue } from 'react-select'
import { api } from 'src/utils/api'
import { capitalize, selectOptions } from 'src/utils/helpers'

interface MenuProps {
  selectedTime: string // as ISO string
  addToCart: (id: string, quantity: number) => void
}

const Menu: FC<MenuProps> = ({ selectedTime, addToCart }) => {
  const router = useRouter()
  const { data: menuItems } = api.menu.getMenuItems.useQuery(undefined, { refetchOnMount: false })
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredMenuItems = menuItems?.filter((menuItem) => {
    if (!filter) return true

    return menuItem.categories.includes(filter)
  })

  function handleSelectChange(
    event: SingleValue<{
      value: 'private' | 'group' | 'other' | 'all'
      label: string
    }>
  ) {
    if (event?.value === 'all') {
      return setFilter(undefined)
    } else setFilter(event?.value)
  }

  return (
    <div className='flex w-full flex-col  rounded-xl bg-gray-900 p-2 text-gray-100'>
      <h2 className='flex items-center gap-4 px-4 font-sans text-2xl font-thin tracking-wider text-gray-100'>
        <HiArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
        Our Training Options for :
        <span className='text-sm text-[1.2rem] font-medium text-cyan-300 '>
          [{format(parseISO(selectedTime), 'MMM do, yyyy')}]
        </span>
      </h2>

      <div className='w-full p-2  '>
        <Select
          onChange={handleSelectChange}
          className='border-none outline-none'
          options={selectOptions}
          placeholder='Filter by category'
          isMulti={false}
        />
      </div>
      <div className='flex h-[500px] w-full items-center justify-center gap-5 rounded-xl bg-gray-700 px-2 py-2'>
        {filteredMenuItems?.map((menuItem) => (
          <div
            key={menuItem.id}
            className='flex h-44 w-80 max-w-md justify-between rounded-lg border-2 border-gray-800 bg-cyan-600 text-center'
          >
            <Image
              src={menuItem.url}
              alt={menuItem.name}
              className='m-2 w-full rounded-lg '
              width={64}
              height={36}
            />
            <div className='flex w-full flex-col gap-2'>
              <h3 className='text-center font-extralight text-gray-100'>
                <p>{menuItem.name}</p>
              </h3>
              <p className='w-full text-center text-gray-800'>
                {menuItem.categories.map((c) => capitalize(c)).join(', ')}
              </p>

              <p className='font- w-full text-center text-sm tracking-wider text-green-300'>
                ${menuItem.price.toFixed(2)}
              </p>
              <button
                className='rounded-md border-2 border-gray-900 bg-green-500 text-sm font-semibold text-white transition duration-150 hover:border-gray-600 hover:bg-opacity-50 hover:text-gray-900'
                onClick={() => {
                  addToCart(menuItem.id, 1)
                }}
              >
                Book it
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu
