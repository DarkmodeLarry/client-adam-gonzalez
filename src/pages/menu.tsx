import Menu from '@components/Menu'
import Cart from '@components/Cart'
import Spinner from '@components/Spinner'
import { parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { now } from 'src/constants/config'
import { api } from 'src/utils/api'

const MenuPage: FC = () => {
  const router = useRouter()

  const [selectedTime, setSelectedTime] = useState<string | null>(null) // as ISO string
  const { isFetchedAfterMount } = api.menu.checkMenuStatus.useQuery(undefined, {
    onError: () => {
      // check for validity of selectedTime failed
      // TODO Handle error
    }
  })

  const [showCart, setShowCart] = useState<boolean>(false)
  const [productsInCart, setProductsInCart] = useState<{ id: string; quantity: number }[]>([])
  const addToCart = (id: string, quantity: number) => {
    setProductsInCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + quantity }
          return item
        })
      }
      return [...prev, { id, quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setProductsInCart((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    const selectedTime = localStorage.getItem('selectedTime')
    if (!selectedTime) router.push('/')
    else {
      const date = parseISO(selectedTime)
      if (date < now) router.push('/')

      // Date is valid
      setSelectedTime(selectedTime)
    }
  }, [router])

  return (
    <>
      <Cart
        removeFromCart={removeFromCart}
        open={showCart}
        setOpen={setShowCart}
        products={productsInCart}
      />
      {isFetchedAfterMount && selectedTime ? (
        <div className='mt-10 flex min-h-screen max-w-7xl flex-col-reverse items-center justify-end bg-gray-300 sm:px-6 lg:px-8'>
          {/* Cart Icon */}
          <div className='mt-2 flex w-full rounded-lg bg-gray-800'>
            <button
              type='button'
              onClick={() => setShowCart((prev) => !prev)}
              className='flex w-full items-center justify-center rounded-lg bg-gray-800 p-3 text-lg font-medium text-cyan-400'
            >
              <RiShoppingCartLine className='h-14 w-16 text-green-500' />
              Items in cart:
              {productsInCart.reduce((acc, item) => acc + item.quantity, 0)}
            </button>
          </div>

          <Menu addToCart={addToCart} selectedTime={selectedTime} />
        </div>
      ) : (
        <div className='flex h-screen items-center justify-center'>
          <Spinner />
        </div>
      )}
    </>
  )
}

export default MenuPage
