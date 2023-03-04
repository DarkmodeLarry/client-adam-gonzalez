import { type categories } from 'src/constants/config'

export type DateTime = {
  bookingDate: Date | null
  bookingTime: Date | null
}

export type Categories = (typeof categories)[number]
