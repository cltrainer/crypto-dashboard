import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { Paper } from '@mui/material'
import BaseVirtualizedTable from './BaseVirtualTable'
import ChangeIndicator from 'components/ChangeIndicator'
import { CoinResponse, TimeFrame } from 'types/main.d'
import { formatPrice } from 'services/helpers'

type Props<T> = {
  dataSource: Array<T>
  timeFrame: TimeFrame
  onRowClick: (row: T, index: number) => void
}

const CryptoVirtualTable: FC<Props<CoinResponse>> = ({ dataSource, timeFrame, onRowClick }) => {
  return (
    <Paper style={{ height: '90vh', width: '100%' }}>
      <BaseVirtualizedTable
        onRowClick={onRowClick}
        rowCount={dataSource.length}
        rowGetter={({ index }) => dataSource[index]}
        columns={[
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
            dataKey: 'protein',
            numeric: true
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
