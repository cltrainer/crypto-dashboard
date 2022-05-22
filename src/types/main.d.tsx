export type TimeFrame = 1 | 3 | 7

export interface Sparkline {
  price: number[]
}

export interface CoinResponse {
  [key: string]: string | number | Sparkline
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  sparkline_in_7d: Sparkline
}
