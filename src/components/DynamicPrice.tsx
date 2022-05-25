import { FC } from 'react'
import { green, red } from '@mui/material/colors'
import useColorChange from 'use-color-change'
import { formatPrice } from 'services/helpers'

interface Props {
  value: number
}

const DynamicPrice: FC<Props> = ({ value }) => {
  const colorStyle = useColorChange(value, {
    higher: green[500],
    lower: red[500],
    duration: 3000
  })

  return <div style={colorStyle}>{formatPrice(value)}</div>
}

export default DynamicPrice
