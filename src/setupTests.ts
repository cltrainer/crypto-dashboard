// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom'

// Enzyme configuration
import Enzyme, { ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { act } from 'react-dom/test-utils'
Enzyme.configure({ adapter: new Adapter() })

export const waitForComponentToPaint = async (wrapper: ReactWrapper, interval = 0, callback: () => void) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, interval))
    wrapper.update()
    callback()
  })
}
