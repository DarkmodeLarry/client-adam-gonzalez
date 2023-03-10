import { type ChangeEvent, type FC, useEffect, useState } from 'react'
import type { MultiValue } from 'react-select/dist/declarations/src'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { selectOptions } from 'src/utils/helpers'
import { MAX_FILE_SIZE } from 'src/constants/config'
import { api } from 'src/utils/api'
import type { Categories } from 'src/utils/types'

const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })

interface Input {
  name: string
  price: number
  categories: MultiValue<{ value: string; label: string }>
  file: undefined | File
}

const initialInput = {
  name: '',
  price: 0,
  categories: [],
  file: undefined
}

const Menu: FC = () => {
  const [input, setInput] = useState<Input>(initialInput)
  const [preview, setPreview] = useState<string>('')
  const [error, setError] = useState<string>('')

  // tRPC
  const { mutateAsync: createPresignedUrl } = api.admin.createPresignedUrl.useMutation()
  const { mutateAsync: addItem } = api.admin.addMenuItem.useMutation()
  const { data: menuItems, refetch } = api.menu.getMenuItems.useQuery()
  const { mutateAsync: deleteMenuItem } = api.admin.deleteMenuItem.useMutation()

  useEffect(() => {
    // create the preview
    if (!input.file) return
    const objectUrl = URL.createObjectURL(input.file)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [input.file])

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return setError('No file selected')
    if (event.target.files[0].size > MAX_FILE_SIZE) return setError('File size is too big')
    setInput((prev) => ({ ...prev, file: event.target.files![0] }))
  }

  async function handleImageUpload() {
    const { file } = input
    if (!file) return

    const { fields, key, url } = await createPresignedUrl({
      fileType: file.type
    })

    const data = {
      ...fields,
      'Content-Type': file.type,
      file
    }

    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob)
    })

    await fetch(url, {
      method: 'POST',
      body: formData
    })

    return key
  }

  async function addMenuItem() {
    // (async () => {
    const key = await handleImageUpload()
    if (!key) throw new Error('No key')

    await addItem({
      name: input.name,
      imageKey: key,
      categories: input.categories.map((category) => category.value as Exclude<Categories, 'all'>),
      price: input.price
    })

    await refetch()

    // Reset input
    setInput(initialInput)
    setPreview('')
    // })();
  }

  const handleDelete = async (imageKey: string, id: string) => {
    await deleteMenuItem({ imageKey, id })
    refetch()
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className='min-h-screen max-w-full bg-gray-400'>
        <div className='flex flex-col justify-center gap-2 py-5 px-5 '>
          <h2 className='my-5 text-center text-4xl font-semibold'>Edit Menu</h2>
          <input
            name='name'
            className='h-12 rounded-sm border-none bg-gray-600 pl-2'
            type='text'
            placeholder='Name of Training Session'
            onChange={handleTextChange}
            value={input.name}
          />
          <input
            name='price'
            className='h-12 rounded-sm bg-gray-200 pl-3'
            type='number'
            placeholder='price'
            onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
            value={input.price}
          />

          <DynamicSelect
            value={input.categories}
            // @ts-expect-error - when using dynamic import, typescript doesn't know about the onChange prop
            onChange={(e) => setInput((prev) => ({ ...prev, categories: e }))}
            isMulti
            className='h-12'
            options={selectOptions}
          />

          <label
            htmlFor='file'
            className='relative h-12 cursor-pointer rounded-sm bg-gray-200 focus-within:outline-none'
          >
            <span className='sr-only'>File input</span>
            <div className='flex h-full items-center justify-center'>
              {preview ? (
                <div className='relative h-3/4 w-full bg-gray-600'>
                  <Image alt='preview' style={{ objectFit: 'contain' }} fill src={preview} />
                </div>
              ) : (
                <span>Select image</span>
              )}
            </div>
            <input
              name='file'
              id='file'
              onChange={handleFileSelect}
              accept='image/jpeg image/png image/jpg'
              type='file'
              className='sr-only'
            />
          </label>

          <button
            className='h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed'
            disabled={!input.file || !input.name}
            onClick={addMenuItem}
          >
            Add menu item
          </button>
        </div>
        {error && <p className='text-xs text-red-600'>{error}</p>}

        <div className='mx-auto mt-10 max-w-7xl'>
          <p className='text-semibold text-center text-2xl'>Your menu items:</p>
          <div className='flex w-full flex-col '>
            {menuItems?.map((menuItem) => (
              <div className='w-full  p-8' key={menuItem.id}>
                <div className='flex bg-gray-600'>
                  <div className='relative h-28 w-28 rounded-lg border-4 border-cyan-900 '>
                    <Image priority fill alt='' src={menuItem.url} />
                  </div>
                  <div className='flex h-1/2 flex-col justify-center pt-4  pl-4 capitalize tracking-wider text-[var(--white)] '>
                    <p className='text-left text-sm font-semibold'>{menuItem.name}</p>
                    <br />
                    <p className='text-left text-sm font-semibold'>$ {menuItem.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(menuItem.imageKey, menuItem.id)}
                  className='text-xs text-red-500'
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Menu
