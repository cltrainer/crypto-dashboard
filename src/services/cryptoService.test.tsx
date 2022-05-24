import { getCryptoList, getCryptoHistory } from './cryptoService'

describe('CryptoService', () => {
  it('get full crypto list with sparkline data', done => {
    getCryptoList({
      showSparkline: true,
      onSuccess: data => {
        expect(data.length).toBeGreaterThan(0)
        expect(data[0].sparkline_in_7d).toBeTruthy()
        expect(data[0].sparkline_in_7d.price.length).toBeGreaterThan(0)
        done()
      },
      onFail: error => {
        done(error)
      }
    })
  })

  it('get past 24h price change of BTC', done => {
    getCryptoHistory({
      id: 'bitcoin',
      onSuccess: data => {
        expect(data.prices.length).toBeGreaterThan(0)
        done()
      },
      onFail: error => {
        done(error)
      }
    })
  })
})
