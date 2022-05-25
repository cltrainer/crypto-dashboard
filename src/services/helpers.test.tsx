import { formatPrice, getCurrentTimestamp } from './helpers'

describe('Helpers', () => {
  it('show 0.0001 in formatted price', () => {
    expect(formatPrice(0.0001)).toEqual('$0.0001')
  })

  it('show 1000.0001 in formatted price', () => {
    expect(formatPrice(1000.0001)).toEqual('$1,000.00')
  })

  it('show current time in formatted timestamp', () => {
    // Sample output = 5/25/2022, 5:09:19 PM
    const regExp = /^([\d]{1,2}\/[\d]{1,2}\/[\d]{4}, [\d]{1,2}:[\d]{1,2}:[\d]{1,2} [\w]{2})$/g
    const timestamp = getCurrentTimestamp()
    const match = timestamp.match(regExp)
    expect(match ? match.length : 0).toEqual(1)
  })
})
