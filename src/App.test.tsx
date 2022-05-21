import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  it('renders learn react link', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.App-link').text()).toEqual('Learn React')
  })
})
