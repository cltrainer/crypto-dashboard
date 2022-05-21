import { FC } from 'react'
import { Button } from '@mui/material'

type Props = {
  text: string
  count: number
  onClick: () => void
}

const ButtonGroup: FC<Props> = ({ text, count, onClick }) => {
  const output = []
  for (let i = 0; i < count; i += 1) {
    output.push(<Button key={i} variant='contained' onClick={onClick}>{`${text}-${i}`}</Button>)
  }
  return <>{output}</>
}

export default ButtonGroup
