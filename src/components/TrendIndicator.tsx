import { FC } from 'react'
import { styled } from '@mui/material/styles'
import { green, red } from '@mui/material/colors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface Props {
  value: number
}

const TrendIndicator: FC<Props> = ({ value }) => {
  const formattedValue = `${value}%`

  // Drop
  if (value < 0) {
    return (
      <TrendWrapperNegative className='negative'>
        <ArrowDropDownIcon />
        <div className='negative'>{formattedValue}</div>
      </TrendWrapperNegative>
    )
  }

  // No change
  if (value === 0) {
    return (
      <TrendWrapper>
        <div>{formattedValue}</div>
      </TrendWrapper>
    )
  }

  // Rise
  return (
    <TrendWrapperPositve>
      <ArrowDropUpIcon />
      <div>{formattedValue}</div>
    </TrendWrapperPositve>
  )
}

const TrendWrapper = styled('div')`
  display: flex;
  flex-direction: row;
`
const TrendWrapperPositve = styled(TrendWrapper)`
  color: ${green[500]};
`
const TrendWrapperNegative = styled(TrendWrapper)`
  color: ${red[500]};
`

export default TrendIndicator
