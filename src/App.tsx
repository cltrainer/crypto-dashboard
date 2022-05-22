import { FC, useEffect, useState } from 'react'
import { Slider, styled } from '@mui/material'
import ButtonGroup from 'components/ButtonGroup'
import CryptoVirutalTable from 'components/Table/CryptoVirtualTable'
import logo from './logo.svg'
import './App.css'

import { getCryptoList } from 'services/cryptoService'
import { CoinResponse } from 'types/main.d'

const App: FC = () => {
  const [priceList, setPriceList] = useState<Array<CoinResponse>>([])

  useEffect(() => {
    getCryptoList(
      data => {
        console.log(data)
        setPriceList(data)
      },
      error => {
        console.error(error)
      }
    )
  }, [])

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
        <CryptoVirutalTable
          dataSource={priceList}
          onRowClick={(row, index) => {
            console.log('clicked-->', index, row)
          }}
        />
        <Wrapper>
          <Slider />
          <ButtonGroup text='hello' count={3} onClick={() => console.log('clicked')} />
        </Wrapper>
      </header>
    </div>
  )
}

const Wrapper = styled('div')`
  width: 80%;
`

export default App
