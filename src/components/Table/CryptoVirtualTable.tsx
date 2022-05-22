import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Paper from '@mui/material/Paper'
import BaseVirtualizedTable from './BaseVirtualTable'
import { CoinResponse } from 'types/main.d'

type Props<T> = {
  dataSource: Array<T>
  onRowClick: (row: T, index: number) => void
}

const CryptoVirtualTable: FC<Props<CoinResponse>> = ({ dataSource, onRowClick }) => {
  return (
    <Paper style={{ height: '100vh', width: '100%' }}>
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
            dataKey: 'name'
          },
          {
            width: 150,
            label: 'Price (USD)',
            dataKey: 'current_price',
            numeric: true,
            render: record => `$${record.toString()}`
          },
          {
            width: 120,
            label: '24h',
            dataKey: 'price_change_percentage_24h',
            numeric: true,
            render: record => {
              if (typeof record === 'number') {
                const value = `${record}%`
                if (record < 0) {
                  return (
                    <ChangeWrapperNegative className='negative'>
                      <ArrowDropDownIcon />
                      <div className='negative'>{value}</div>
                    </ChangeWrapperNegative>
                  )
                }
                if (record === 0) {
                  return (
                    <ChangeWrapper>
                      <div>{value}</div>
                    </ChangeWrapper>
                  )
                }
                return (
                  <ChangeWrapperPositve>
                    <ArrowDropUpIcon />
                    <div>{value}</div>
                  </ChangeWrapperPositve>
                )
              }
              return <></>
            }
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
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
const ChangeWrapper = styled('div')`
  display: flex;
  flex-direction: row;
`
const ChangeWrapperPositve = styled(ChangeWrapper)`
  color: ${green[500]};
`
const ChangeWrapperNegative = styled(ChangeWrapper)`
  color: ${red[500]};
`

export default CryptoVirtualTable
