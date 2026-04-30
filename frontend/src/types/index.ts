export interface Reservation {
  date: string
  guests: number
  time: string
  name: string
  email: string
  phone: string
  notes: string
}

export interface ReservationResponse {
  id: string
  status: 'confirmed'
}

export interface MenuItem {
  n: string
  d: string
  p: string
}

export interface MenuSection {
  cat: string
  desc: string
  items: MenuItem[]
}

export type Lang = 'it' | 'en'

export type CopyDict = Record<string, string>
export type CopyMap = Record<Lang, CopyDict>
