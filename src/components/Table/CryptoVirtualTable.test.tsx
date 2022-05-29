import { mount } from 'enzyme'
import { CoinResponse } from 'types/main.d'
import CryptoVirtualTable from './CryptoVirtualTable'

describe('<CryptoVirutalTable />', () => {
  const data = {
    id: '0',
    symbol: '',
    name: '',
    image: '',
    current_price: 0,
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    sparkline_in_7d: { price: [] },
    market_cap_rank: 0
  }
  const onRowClick = jest.fn()
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')
  const targetDimension = { configurable: true, value: 50 }

  // Set dimension for virtual table rendering
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', targetDimension)
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', targetDimension)
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight || targetDimension)
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth || targetDimension)
  })

  it('render table empty value', () => {
    const wrapper = mount(<CryptoVirtualTable dataSource={[data]} timeFrame={1} onRowClick={onRowClick} />)
    const columns = wrapper.find('[role="columnheader"]')
    expect(columns.length).toBe(7)
  })
})
