import { shallow } from 'enzyme'
import DynamicPrice from './DynamicPrice'
import { formatPrice } from 'services/helpers'

describe('<DynamicPrice />', () => {
  it('show 100 in formatted price', () => {
    const value = 100
    const wrapper = shallow(<DynamicPrice value={value} />)
    expect(wrapper.text()).toEqual(formatPrice(value))
  })
})
