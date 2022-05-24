import { CoinResponse, CryptoHistory } from 'types/main.d'

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3'
const CURRENCY = 'usd'

interface BaseRequest<T> {
  onSuccess: { (data: T): void }
  onFail: { (error: Error): void }
}

interface GetCryptoListRequest extends BaseRequest<Array<CoinResponse>> {
  showSparkline: boolean
}

interface GetCryptoHistoryRequest extends BaseRequest<CryptoHistory> {
  id: string
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
