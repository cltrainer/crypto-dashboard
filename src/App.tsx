import { FC, useEffect, useState } from 'react'
import { styled, Container } from '@mui/material'
import CryptoVirutalTable from 'components/Table/CryptoVirtualTable'
import TimeFrameToggle from 'components/TimeFrameToggle'
import './App.css'

import { getCryptoList } from 'services/cryptoService'
import { getCurrentTimestamp } from 'services/helpers'
import { CoinResponse, TimeFrame } from 'types/main.d'
import CryptoHistoryDialog from 'components/Dialog/CryptoHistoryDialog'

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

  return (
    <Container fixed>
      <p>last updated: {lastTimestamp}</p>
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
      <CryptoHistoryDialog
        crypto={selectedCrypto >= 0 ? cryptoList[selectedCrypto] : undefined}
        onClose={() => setSelectedCrypto(-1)}
      />
    </Container>
  )
}

export default App
