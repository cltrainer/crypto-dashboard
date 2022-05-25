import { ReactWrapper, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { waitForComponentToPaint } from 'setupTests'
import { CoinResponse } from 'types/main.d'
import CryptoHistoryDialog from './CryptoHistoryDialog'

debugger

describe('CryptoHistoryDialog', () => {
  const onClose = jest.fn()
  const sampleCrypto: CoinResponse = {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: '/icon.png',
    current_price: 100,
    price_change_24h: 100,
    price_change_percentage_24h: 100,
    sparkline_in_7d: { price: [] },
    market_cap_rank: 1
  }

  it('open and close a empty dialog', () => {
    const wrapper = mount(<CryptoHistoryDialog open={true} />)
    expect(wrapper.exists('#empty-crypto')).toEqual(true)
  })

  it('open and close dialog with incorrect cypto info', async () => {
    const incorrectCrypto = { ...sampleCrypto, id: 'fake-crypto', name: 'Fake Crypto' }
    const wrapper = mount(<CryptoHistoryDialog open={true} onClose={onClose} crypto={incorrectCrypto} />)
    expect(wrapper.exists('[role="progressbar"]')).toEqual(true)
    await waitForComponentToPaint(wrapper, 2000, () => {
      expect(wrapper.text()).toContain('Error')
      wrapper.find('button').simulate('click')
      expect(onClose).toBeCalled()
    })
  })

  // it('open dialog with bitcoin cypto info', async done => {
  //   jest.setTimeout()
  //   const wrapper = mount(<CryptoHistoryDialog open={true} onClose={onClose} crypto={sampleCrypto} />)
  //   await waitForComponentToPaint(wrapper, 2000, () => {
  //     expect(wrapper.text()).toContain(sampleCrypto.name)
  //     expect(wrapper.exists('.react-financial-charts')).toEqual(true)
  //     done()
  //   })
  // })
})
