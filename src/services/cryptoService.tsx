import { CoinResponse, CryptoHistory } from 'types/main.d'

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3'
const CURRENCY = 'usd'

interface ErrorResponseFunction {
  (error: Error): void
}

interface GetCryptoListRequest {
  showSparkline: boolean
  onSuccess: { (data: Array<CoinResponse>): void }
  onFail: ErrorResponseFunction
}

interface GetCryptoHistoryRequest {
  id: string
  onSuccess: { (data: CryptoHistory): void }
  onFail: ErrorResponseFunction
}

export const getCryptoList = ({ showSparkline, onSuccess, onFail }: GetCryptoListRequest) => {
  fetch(`${COINGECKO_ENDPOINT}/coins/markets?vs_currency=${CURRENCY}&sparkline=${showSparkline}`)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFail(error))
}

export const getCryptoHistory = ({ id, onSuccess, onFail }: GetCryptoHistoryRequest) => {
  fetch(`${COINGECKO_ENDPOINT}/coins/${id}/market_chart?vs_currency=${CURRENCY}&days=1`)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFail(error))
}
