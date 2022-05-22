import React, { ReactNode } from 'react'
import clsx from 'clsx'
import { Theme, styled } from '@mui/material/styles'
import { TableCell } from '@mui/material'
import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized'
import { CoinResponse } from 'types/main.d'

const classes = {
  flexContainer: 'ReactVirtualizedDemo-flexContainer',
  tableRow: 'ReactVirtualizedDemo-tableRow',
  tableRowHover: 'ReactVirtualizedDemo-tableRowHover',
  tableCell: 'ReactVirtualizedDemo-tableCell',
  noClick: 'ReactVirtualizedDemo-noClick'
}

const styles = ({ theme }: { theme: Theme }) =>
  ({
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important'
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined
      })
    },
    [`& .${classes.flexContainer}`]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box'
    },
    [`& .${classes.tableRow}`]: {
      cursor: 'pointer'
    },
    [`& .${classes.tableRowHover}`]: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200]
      }
    },
    [`& .${classes.tableCell}`]: {
      flex: 1
    },
    [`& .${classes.noClick}`]: {
      cursor: 'initial'
    }
  } as const)

interface ColumnData<T> {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
  render?: (record: keyof T, row: T, index: number) => ReactNode
}

interface Row {
  index: number
}

interface MuiVirtualizedTableProps<T> {
  columns: readonly ColumnData<T>[]
  headerHeight?: number
  onRowClick?: (row: T, index: number) => void
  rowCount: number
  rowGetter: (row: Row) => T
  rowHeight?: number
}

class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps<CoinResponse>> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48
  }

  getRowClassName = ({ index }: Row) => {
    const { onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null
    })
  }

  cellRenderer: TableCellRenderer = ({ cellData, columnIndex, rowData }) => {
    const { columns, rowHeight, onRowClick } = this.props
    const rednerCell = () => {
      const renderer = columns[columnIndex].render
      return renderer ? renderer(cellData, rowData, columnIndex) : cellData
    }
    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null
        })}
        variant='body'
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {rednerCell()}
      </TableCell>
    )
  }

  headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns } = this.props

    return (
      <TableCell
        component='div'
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant='head'
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  render() {
    const { columns, rowHeight, headerHeight, onRowClick, ...tableProps } = this.props
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit'
            }}
            headerHeight={headerHeight!}
            onRowClick={({ rowData, index }) => {
              if (onRowClick) {
                onRowClick(rowData, index)
              }
            }}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }
}

const BaseVirtualizedTable = styled(MuiVirtualizedTable)(styles)
export default BaseVirtualizedTable
