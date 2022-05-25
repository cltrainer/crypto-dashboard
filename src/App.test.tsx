import { mount } from 'enzyme'
import { waitForComponentToPaint } from 'setupTests'
import App from './App'

describe('<App />', () => {
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

  it('renders page with table and time frame control', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('.timestamp').text()).toEqual('Last updated at ')
    expect(wrapper.exists('.MuiToggleButtonGroup-root')).toEqual(true)
    expect(wrapper.exists('.ReactVirtualized__Table')).toEqual(true)
  })

  it('select 3d time frame and update average price', () => {
    const wrapper = mount(<App />)
    // Click time frame button
    const timeFrameButton = wrapper.find('.MuiToggleButtonGroup-root').find('button[value=3]')
    timeFrameButton.at(0).simulate('click')
    wrapper.update()
    // Check table column
    const averageColumnHead = wrapper.find('.ReactVirtualized__Table').find('[role="columnheader"]').last()
    expect(averageColumnHead.text()).toEqual('Avg in 3d')
  })

  it('click table first row to show historical data', async () => {
    const wrapper = mount(<App />)
    await waitForComponentToPaint(wrapper, 2000, async () => {
      // Check available data
      const table = wrapper.find('.ReactVirtualized__Table')
      expect(table.props()['aria-rowcount']).toBeGreaterThan(0)
      // Click first table row to open modal
      const firstRow = table.find('[aria-label="row"]').first()
      firstRow.at(0).simulate('click')
      wrapper.update()
      const dialog = wrapper.find('.MuiModal-root')
      expect(dialog.exists()).toEqual(true)
    })
  })

  // it('page refresh for every 1min', done => {
  //   jest.useFakeTimers()
  //   const wrapper = mount(<App />)
  //   const timestamp = wrapper.find('.timestamp').text()
  //   jest.advanceTimersByTime(65000)
  //   wrapper.update()
  //   const newTimestamp = wrapper.find('.timestamp').text()
  //   expect(timestamp !== newTimestamp).toEqual(true)
  //   jest.useRealTimers()
  //   done()
  // })
})
