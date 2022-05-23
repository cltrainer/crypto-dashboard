export type TimeFrame = 1 | 3 | 7

export interface CryptoSparkline {
  price: Array<number>
}

export interface CryptoHistory {
  prices: Array<number[]>
  market_caps: Array<number[]>
  total_volumes: Array<number[]>
}

export interface CoinResponse {
  [key: string]: string | number | CryptoSparkline
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  sparkline_in_7d: CryptoSparkline
  market_cap_rank: number
}
