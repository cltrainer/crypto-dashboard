import { shallow } from 'enzyme'
import LineChart from './LineChart'

describe('<LineChart />', () => {
  it('render line chart', () => {
    const initialData = [
      { date: 1653035020570, price: 30285.906731897827 },
      { date: 1653035409934, price: 30293.10132995922 },
      { date: 1653035639957, price: 30345.867782675414 },
      { date: 1653035934589, price: 30337.883182243015 }
    ]
    const wrapper = shallow(<LineChart initialData={initialData} />)
    expect(wrapper.exists('.react-financial-charts')).toEqual(true)
  })
})
