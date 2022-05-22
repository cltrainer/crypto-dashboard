import { CoinResponse } from 'types/main.d'

const COINGECKO_ENDPOINT = 'https://api.coingecko.com/api/v3'

interface ErrorResponseFunction {
  (error: Error): void
}

export const getCryptoList = (onSuccess: { (data: Array<CoinResponse>): void }, onFail: ErrorResponseFunction) => {
  fetch(`${COINGECKO_ENDPOINT}/coins/markets?vs_currency=usd&page=1&sparkline=true`)
    .then(response => response.json())
    .then(data => onSuccess(data))
    .catch(error => onFail(error))
}
