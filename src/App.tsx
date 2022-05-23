import { FC, useEffect, useState } from 'react'
import { styled, Container } from '@mui/material'
import CryptoVirutalTable from 'components/Table/CryptoVirtualTable'
import TimeFrameToggle from 'components/TimeFrameToggle'
// import LineChart from 'components/LineChart'
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
    const refreshCryptoList = () => {
      getCryptoList({
        showSparkline: true,
        onSuccess: data => {
          console.log('tick - ', getCurrentTimestamp(), ` - ${data[0].name}-$${data[0].current_price}`)
          setCryptoList(data)
          setLastTimestamp(getCurrentTimestamp())
        },
        onFail: error => {
          console.error(error)
        }
      })
    }

    refreshCryptoList()
    setInterval(() => {
      refreshCryptoList()
    }, 60000) // refresh for every 1 min
  }, [])

  return (
    <Container fixed>
      {/* <LineChart /> */}
      <ActionWrapper>
        <p className='timestamp'>Last updated at {lastTimestamp}</p>
        <p className='toggleCaption'>Show average price in </p>
        <TimeFrameToggle
          value={selectedTimeFrame}
          onChange={value => {
            // console.log('value = ', value)
            setSelectedTimeFrame(value)
          }}
        />
      </ActionWrapper>
      <CryptoVirutalTable
        dataSource={cryptoList}
        timeFrame={selectedTimeFrame}
        onRowClick={(row, index) => {
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

const ActionWrapper = styled('div')`
  display: flex;
  margin: 16px 0;
  .timestamp {
    flex-grow: 1;
  }
  .toggleCaption {
    margin-right: 16px;
  }
`

export default App
