import { mount } from 'enzyme'
import TrendIndicator from './TrendIndicator'

debugger

describe('<TrendIndicator />', () => {
  it('show down arrow with negative value', () => {
    const wrapper = mount(<TrendIndicator value={-1} />)
    expect(wrapper.text()).toEqual('-1%')
    expect(wrapper.exists('[data-testid="ArrowDropDownIcon"]')).toEqual(true)
  })

  it('show zero value', () => {
    const wrapper = mount(<TrendIndicator value={0} />)
    expect(wrapper.text()).toEqual('0%')
  })

  it('show up arrow with positive value', () => {
    const wrapper = mount(<TrendIndicator value={1} />)
    expect(wrapper.text()).toEqual('1%')
    expect(wrapper.exists('[data-testid="ArrowDropUpIcon"]')).toEqual(true)
  })
})
