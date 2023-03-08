import { prisma } from '../../server/db/client'
import TimeSelector from '@components/TimeSelector'
import { Switch } from '@headlessui/react'
import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import { type FC, useState } from 'react'
import { Calendar } from 'react-calendar'
import toast, { Toaster } from 'react-hot-toast'
import { now } from 'src/constants/config'
import { capitalize, classNames, weekdayIndexToName } from 'src/utils/helpers'
import { api } from 'src/utils/api'
import { HiArrowLeft } from 'react-icons/hi'
import Link from 'next/link'

interface OpeningProps {
  days: Day[]
}

const Opening: FC<OpeningProps> = ({ days }) => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Non-null-assertions because if days are less than 7, an error is thrown previously
  const [openingHrs, setOpeningHrs] = useState([
    { name: 'sunday', openTime: days[0]!.openTime, closeTime: days[0]!.closeTime },
    { name: 'monday', openTime: days[1]!.openTime, closeTime: days[1]!.closeTime },
    { name: 'tuesday', openTime: days[2]!.openTime, closeTime: days[2]!.closeTime },
    { name: 'wednesday', openTime: days[3]!.openTime, closeTime: days[3]!.closeTime },
    { name: 'thursday', openTime: days[4]!.openTime, closeTime: days[4]!.closeTime },
    { name: 'friday', openTime: days[5]!.openTime, closeTime: days[5]!.closeTime },
    { name: 'saturday', openTime: days[6]!.openTime, closeTime: days[6]!.closeTime }
  ])

  // tRPC
  const { mutate: saveOpeningHrs, isLoading } = api.opening.changeOpeningHours.useMutation({
    onSuccess: () => toast.success('Opening hours saved'),
    onError: () => toast.error('Something went wrong')
  })
  const { mutate: closeDay } = api.opening.closeDay.useMutation({ onSuccess: () => refetch() })
  const { mutate: openDay } = api.opening.openDay.useMutation({ onSuccess: () => refetch() })
  const { data: closedDays, refetch } = api.opening.getClosedDays.useQuery()

  const dayIsClosed = selectedDate && closedDays?.includes(formatISO(selectedDate))

  // Curried for easier usage
  function _changeTime(day: Day) {
    return function (time: string, type: 'openTime' | 'closeTime') {
      const index = openingHrs.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))
      const newOpeningHrs = [...openingHrs]
      newOpeningHrs[index]![type] = time
      setOpeningHrs(newOpeningHrs)
    }
  }

  return (
    <div className='relative mx-auto h-screen max-w-xl'>
      <div className='fixed top-0 left-0 gap-6'>
        <Link href='/dashboard'>
          <HiArrowLeft className='h-10 w-10 text-xl text-black' />
        </Link>
      </div>
      <Toaster />
      <div className='fixed bottom-0 mt-6 flex h-16 w-full items-center justify-center gap-6 bg-gray-900  text-white'>
        <div className='w-1/3 text-right'>
          <p className={`${!enabled ? 'text-lg font-semibold  text-amber-500' : ''}`}>
            Opening times
          </p>
        </div>
        <div className='mx-auto w-1/3  text-center'>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
              enabled ? 'bg-indigo-600' : 'bg-gray-600',
              'relative inline-flex h-11 w-20 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent  transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
          >
            <span className='sr-only'>Use setting</span>
            <span
              aria-hidden='true'
              className={classNames(
                enabled ? 'translate-x-10' : 'translate-x-0',
                'pointer-events-none inline-block h-10 w-10 transform rounded-full bg-white shadow ring-0 transition-all duration-300 ease-in-out'
              )}
            />
          </Switch>
        </div>
        <div className='w-1/3 text-left'>
          <p className={`${enabled ? 'text-lg font-semibold tracking-wider text-green-500' : ''}`}>
            Opening days
          </p>
        </div>
      </div>
      {!enabled ? (
        // Opening times options
        <div className='my-12 flex flex-col gap-6 text-sm'>
          {days.map((day) => {
            const changeTime = _changeTime(day)
            return (
              <div className='grid grid-cols-3 place-items-center' key={day.id}>
                <h3 className='font-semibold'>{capitalize(weekdayIndexToName(day.dayOfWeek)!)}</h3>
                <div className='mx-4'>
                  <TimeSelector
                    type='openTime'
                    changeTime={changeTime}
                    selected={
                      openingHrs[
                        openingHrs.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))
                      ]?.openTime
                    }
                  />
                </div>

                <div className='mx-4'>
                  <TimeSelector
                    type='closeTime'
                    changeTime={changeTime}
                    selected={
                      openingHrs[
                        openingHrs.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))
                      ]?.closeTime
                    }
                  />
                </div>
              </div>
            )
          })}

          <button
            onClick={() => {
              const withId = openingHrs.map((day) => ({
                ...day,
                id: days[days.findIndex((d) => d.name === day.name)]!.id
              }))

              saveOpeningHrs(withId)
            }}
          >
            Save
          </button>
        </div>
      ) : (
        // Opening days options
        <div className='mt-6 flex flex-col items-center gap-6'>
          <Calendar
            minDate={now}
            className='REACT-CALENDAR p-2'
            view='month'
            onClickDay={(date) => setSelectedDate(date)}
            tileClassName={({ date }) => {
              return closedDays?.includes(formatISO(date)) ? 'closed-day' : null
            }}
          />

          <button
            onClick={() => {
              if (dayIsClosed) openDay({ date: selectedDate })
              else if (selectedDate) closeDay({ date: selectedDate })
            }}
            disabled={!selectedDate}
          >
            {dayIsClosed ? 'Open shop this day' : 'Close shop this day'}
          </button>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const days = await prisma.day.findMany()

  if (!(days.length === 7)) throw new Error('Insert all days into database')

  return { props: { days } }
}

export default Opening
