import { type Day } from '@prisma/client'
import { type FC, useEffect, useState } from 'react'
import { format, formatISO, isBefore, parse } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { getOpeningTimes, roundToNearestMinutes } from 'src/utils/helpers'
import { DateTime } from 'src/utils/types'
import { OPENING_HOURS_INTERVAL, now } from 'src/constants/config'

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

interface CalendarProps {
  days: Day[]
  closedDays: string[] // as ISO strings
}

const CalendarComponent: FC<CalendarProps> = ({ days, closedDays }) => {
  const router = useRouter()

  const today = days.find((d) => d.dayOfWeek === now.getDay())
  const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL)
  const closing = parse(today!.closeTime, 'hh:mm aa', now)
  const tooLate = !isBefore(rounded, closing)
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

  const [date, setDate] = useState<DateTime>({
    bookingDate: null,
    bookingTime: null
  })

  useEffect(() => {
    if (date.bookingTime) {
      localStorage.setItem('selectedTime', date.bookingTime.toISOString())
      void router.push('/menu')
    }
  }, [date.bookingTime])

  const times = date.bookingDate && getOpeningTimes(date.bookingDate, days)

  function chooseBookingDate(date: Date) {
    setDate((prev) => ({ ...prev, bookingDate: date }))
  }

  function chooseBookingTime(time: Date) {
    setDate((prev) => ({ ...prev, bookingTime: time }))
  }

  return (
    <section
      id='calendar'
      className='calendar flex w-full flex-col items-center justify-center bg-[var(--black)]  '
    >
      <h1 className='my-8 text-center text-2xl text-[var(--white)]'>Book A Training Session</h1>
      <div className='flex w-full flex-col items-center md:flex-row'>
        <div className='flex w-1/2 flex-col items-center justify-center gap-8 '>
          <p className='w-full text-center text-xl text-[var(--white)]'>Pick a Date</p>
          <DynamicCalendar
            minDate={now}
            className='REACT-CALENDAR p-2 md:mb-10'
            view='month'
            tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
            onClickDay={chooseBookingDate}
          />
        </div>

        <div className='mt-10 w-full px-1 md:mt-0 md:w-1/2'>
          <h3 className='w-full text-center text-xl tracking-wider text-white'> Pick a Time</h3>
          <div className='mt-5 mb-44 flex flex-wrap items-center gap-2 p-2'>
            {date.bookingDate &&
              times?.map((time, i) => (
                <div key={`time-${i}`} className=''>
                  <button
                    onClick={() => chooseBookingTime(time)}
                    type='button'
                    className='text-md flex h-10 w-28 items-center justify-center rounded-lg border-2 bg-gray-100 font-semibold text-black shadow-md shadow-gray-500  transition-all duration-150 ease-out hover:scale-[.99] hover:border-white hover:bg-gray-700 hover:text-gray-100'
                  >
                    {format(time, 'hh:mm aa')}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalendarComponent
