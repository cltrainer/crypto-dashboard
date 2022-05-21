import { FC } from 'react'
import { Slider, styled } from '@mui/material'
import ButtonGroup from './components/ButtonGroup'
import logo from './logo.svg'
import './App.css'

const App: FC = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Wrapper>
          <Slider />
          <ButtonGroup text='hello' count={3} onClick={() => console.log('clicked')} />
        </Wrapper>
      </header>
    </div>
  )
}

const Wrapper = styled('div')`
  width: 50%;
`

export default App
