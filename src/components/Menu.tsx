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
    <div className='flex w-full flex-col  rounded-xl bg-[var(--black)] p-4 capitalize text-gray-100'>
      <h2 className='flex items-center gap-4 rounded-xl bg-[#b7b7b7] p-4 text-lg font-semibold tracking-wider text-[var(--black)]'>
        <HiArrowLeft className='cursor-pointer' onClick={() => router.push('/')} />
        Our Training Options for :
        <span className='text-sm font-medium text-cyan-700'>
          [{format(parseISO(selectedTime), 'MMM do, yyyy')}]
        </span>
      </h2>

      <div className='w-full py-2  '>
        <Select
          onChange={handleSelectChange}
          className='border-none text-[var(--black)] outline-none'
          options={selectOptions}
          placeholder='Filter by category'
          isMulti={false}
        />
      </div>
      <div className='flex h-[500px] w-full flex-col gap-5 rounded-md bg-gray-700 p-4'>
        {filteredMenuItems?.map((menuItem) => (
          <div
            key={menuItem.id}
            className='flex h-36 w-3/4 max-w-md justify-between rounded-lg border-4 border-gray-400 bg-cyan-700  text-center'
          >
            <div className='flex h-32 w-5/12 flex-col items-center justify-center p-2'>
              <Image
                src={menuItem.url}
                alt={menuItem.name}
                className='m-2 w-full rounded-lg '
                width={36}
                height={32}
              />
            </div>
            <div className='flex w-7/12 flex-col justify-between gap-2 py-2 px-1'>
              <div className=''>
                <h3 className='w-full text-left text-xs font-bold tracking-wider text-gray-400'>
                  {menuItem.categories.map((c) => capitalize(c)).join(', ')}
                </h3>
                <h2 className='w-full text-left text-sm tracking-wider text-gray-100'>
                  {menuItem.name}
                </h2>

                <p className='w-full text-left text-sm font-bold tracking-wider text-green-500'>
                  ${menuItem.price.toFixed(2)}
                </p>
              </div>
              <button
                className='rounded-md border-2 border-gray-900 bg-green-500 px-4 py-2 text-sm font-semibold text-white transition duration-150 hover:border-gray-600 hover:bg-opacity-50 hover:text-gray-900'
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
