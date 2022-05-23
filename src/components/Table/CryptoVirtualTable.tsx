import { FC, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'
import BaseVirtualizedTable from './BaseVirtualTable'
import ChangeIndicator from 'components/ChangeIndicator'
import { CoinResponse, TimeFrame, CryptoSparkline } from 'types/main.d'
import { formatPrice } from 'services/helpers'

type Props<T> = {
  dataSource: Array<T>
  timeFrame: TimeFrame
  onRowClick: (row: T, index: number) => void
}

const CryptoVirtualTable: FC<Props<CoinResponse>> = ({ dataSource, timeFrame, onRowClick }) => {
  const totalSparklineWindow = useMemo(() => {
    if (dataSource.length > 0) {
      return dataSource[0].sparkline_in_7d.price.length
    }
    return 0
  }, [dataSource])

  const requiredSparklineWindow = useMemo(() => {
    if (timeFrame === 7) {
      return totalSparklineWindow
    }
    const windowForOneDay = Math.round(totalSparklineWindow / 7)
    return windowForOneDay * timeFrame
  }, [totalSparklineWindow, timeFrame])

  return (
    <Paper style={{ height: '90vh', width: '100%' }}>
      <BaseVirtualizedTable
        onRowClick={onRowClick}
        rowCount={dataSource.length}
        rowGetter={({ index }) => dataSource[index]}
        columns={[
          {
            width: 50,
            label: '#',
            dataKey: 'market_cap_rank'
          },
          {
            width: 70,
            label: 'Icon',
            dataKey: 'image',
            render: (record, row) => {
              if (typeof record === 'string') {
                return <CryptoSymbol src={record} alt={row.name} />
              }
              return <></>
            }
          },
          {
            width: 80,
            label: 'Symbol',
            dataKey: 'symbol',
            render: record => {
              if (typeof record === 'string') {
                return record.toUpperCase()
              }
              return record
            }
          },
          {
            width: 150,
            label: 'Name',
            dataKey: 'name',
            flexGrow: 1
          },
          {
            width: 150,
            label: 'Price (USD)',
            dataKey: 'current_price',
            numeric: true,
            render: record => {
              if (typeof record === 'number') {
                return formatPrice(record)
              }
              return record
            }
          },
          {
            width: 120,
            label: '24h',
            dataKey: 'price_change_percentage_24h',
            numeric: true,
            render: record => {
              if (typeof record === 'number') {
                return <ChangeIndicator value={record} />
              }
              return record
            }
          },
          {
            width: 150,
            label: `Avg in ${timeFrame}d`,
            dataKey: 'sparkline_in_7d',
            numeric: true,
            render: record => {
              if (typeof record === 'object') {
                const { price } = record as CryptoSparkline
                let sum = 0
                for (let i = 0; i < requiredSparklineWindow; i += 1) {
                  sum += price[i]
                }
                const averagePrice = sum / requiredSparklineWindow
                return formatPrice(averagePrice)
              }
              return 0
            }
          }
        ]}
      />
    </Paper>
  )
}

const CryptoSymbol = styled('img')`
  width: 32px;
`

export default CryptoVirtualTable
