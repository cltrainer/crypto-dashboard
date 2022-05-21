import { mount } from 'enzyme'
import ButtonGroup from './ButtonGroup'

describe('<ButtonGroup />', () => {
  it('renders two <Button> components', () => {
    const wrapper = mount(<ButtonGroup text='' count={2} onClick={() => {}} />)
    expect(wrapper.find('button').length).toEqual(2)
  })

  it('renders "hello" on <Button> components', () => {
    const wrapper = mount(<ButtonGroup text='hello' count={1} onClick={() => {}} />)
    expect(wrapper.find('button').at(0).text()).toEqual('hello-0')
  })

  it('simulates click events', () => {
    const clickFn = jest.fn()
    const wrapper = mount(<ButtonGroup text='hello' count={1} onClick={clickFn} />)
    wrapper.find('button').simulate('click')
    expect(clickFn).toHaveBeenCalled()
  })
})
