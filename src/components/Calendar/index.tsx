import { add, format } from 'date-fns'
import { useState } from 'react'
import ReactCalendar from 'react-calendar'
import { type NextPage } from 'next'
import { STORE_OPENING_TIME, STORE_CLOSING_TIME, INTERVAL } from '../../constants/config'

interface DateType {
  justDate: Date | null
  justTime: Date | null
}

const index: NextPage = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    justTime: null
  })

  const getAvailableTime = () => {
    if (!date.justDate) return
    const { justDate } = date
    const beginning = add(justDate, { hours: STORE_OPENING_TIME })
    const end = add(justDate, { hours: STORE_CLOSING_TIME })
    const times = []

    for (let i = beginning; i <= end; i = add(i, { minutes: INTERVAL })) {
      times.push(i)
    }
    return times
  }

  return (
    <div className='h-screen grid place-items-center'>
      {date.justDate ? (
        <div className='flex flex-wrap items-center justify-center gap-4 p-5'>
          {getAvailableTime()?.map((time) => (
            <button
              key={time.toString()}
              type='button'
              onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              className='rounded-md bg-gray-300 px-1 py-2'
            >
              {format(time, 'hh:mm aa')}
            </button>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className='p-4 shadow-2xl'
          view='month'
          onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
        />
      )}
    </div>
  )
}

export default index
