import { FC } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tab } from '@mui/material'
import { CoinResponse } from 'types/main.d'

type ColumnKeyPair<T> = {
  key: T[keyof T]
  title: string
}

type Props<T> = {
  columns: Array<ColumnKeyPair<T>>
  dataSource: Array<T>
}

const CryptoTable: FC<Props<CoinResponse>> = ({ columns, dataSource }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((h: ColumnKeyPair<CoinResponse>) => (
              <TableCell>{h.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((d: CoinResponse) => (
            <TableRow key={d.id}>
              {columns.map((h: ColumnKeyPair<CoinResponse>) => (
                <TableCell>{d[h.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CryptoTable
