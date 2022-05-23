import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface Props {
  value: number
}

const ChangeIndicator: FC<Props> = ({ value }) => {
  const formattedValue = `${value}%`

  // Drop
  if (value < 0) {
    return (
      <ChangeWrapperNegative className='negative'>
        <ArrowDropDownIcon />
        <div className='negative'>{formattedValue}</div>
      </ChangeWrapperNegative>
    )
  }

  // No change
  if (value === 0) {
    return (
      <ChangeWrapper>
        <div>{formattedValue}</div>
      </ChangeWrapper>
    )
  }

  // Rise
  return (
    <ChangeWrapperPositve>
      <ArrowDropUpIcon />
      <div>{formattedValue}</div>
    </ChangeWrapperPositve>
  )
}

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

export default ChangeIndicator
