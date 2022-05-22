import { FC, useEffect, useState } from 'react'
import { Slider, styled } from '@mui/material'
import ButtonGroup from 'components/ButtonGroup'
import CryptoVirutalTable from 'components/Table/CryptoVirtualTable'
import TimeFrameToggle from 'components/TimeFrameToggle'
import logo from './logo.svg'
import './App.css'

import { getCryptoHistory, getCryptoList } from 'services/cryptoService'
import { getCurrentTimestamp } from 'services/helpers'
import { CoinResponse, TimeFrame } from 'types/main.d'

const App: FC = () => {
  const [cryptoList, setCryptoList] = useState<CoinResponse[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<number>(-1)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>(1)
  const [lastTimestamp, setLastTimestamp] = useState<string>('')

  useEffect(() => {
    getCryptoList({
      showSparkline: true,
      onSuccess: data => {
        setCryptoList(data)
      },
      onFail: error => {
        console.error(error)
      }
    })
  }, [])

  useEffect(() => {
    setInterval(() => {
      setLastTimestamp(getCurrentTimestamp())
    }, 5000)
  }, [])

  useEffect(() => {
    if (cryptoList.length > 0 && selectedCrypto >= 0) {
      getCryptoHistory({
        id: cryptoList[selectedCrypto].id,
        onSuccess: data => {
          console.log(data)
        },
        onFail: error => {
          console.error(error)
        }
      })
    }
  }, [cryptoList, selectedCrypto])

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>last updated: {lastTimestamp}</p>
        <p>selected crypto: {selectedCrypto}</p>
        <TimeFrameToggle
          value={selectedTimeFrame}
          onChange={value => {
            setSelectedTimeFrame(value)
          }}
        />
        <CryptoVirutalTable
          dataSource={cryptoList}
          timeFrame={selectedTimeFrame}
          onRowClick={(row, index) => {
            // console.log('clicked-->', index, row)
            setSelectedCrypto(index)
          }}
        />
      </header>
    </div>
  )
}

export default App
