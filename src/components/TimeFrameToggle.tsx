import { FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { TimeFrame } from 'types/main.d'

type Props = {
  value: TimeFrame
  onChange: (value: TimeFrame) => void
}

const TimeFrameToggle: FC<Props> = ({ value, onChange }) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, value) => {
        onChange(value)
      }}
      aria-label='average time frame'
    >
      <ToggleButton value={1} aria-label='1d'>
        1d
      </ToggleButton>
      <ToggleButton value={3} aria-label='3d'>
        3d
      </ToggleButton>
      <ToggleButton value={7} aria-label='7d'>
        7d
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TimeFrameToggle
