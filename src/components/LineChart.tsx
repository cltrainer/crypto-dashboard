import { FC } from 'react'
import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { ChartCanvas, Chart } from 'react-financial-charts'
import { discontinuousTimeScaleProviderBuilder } from 'react-financial-charts/lib/scale'
import { LineSeries } from 'react-financial-charts/lib/series'
import { XAxis, YAxis } from 'react-financial-charts/lib/axes'
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
  CurrentCoordinate
} from 'react-financial-charts/lib/coordinates'
import { SingleValueTooltip } from 'react-financial-charts/lib/tooltip'

interface Record {
  date: number
  price: number
}

interface Props {
  initialData: Array<Record>
}

const LineChart: FC<Props> = ({ initialData }) => {
  const ratio = 3
  const height = 350
  const width = 500
  const margin = { left: 60, right: 40, top: 30, bottom: 30 }

  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: Record) => new Date(d.date))
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialData)
  const max = xAccessor(data[data.length - 1])
  const min = xAccessor(data[Math.max(0, data.length - 100)])
  const xExtents = [min, max + 5]
  const yAccessor = (d: Record) => d.price

  return (
    <ChartCanvas
      ratio={ratio}
      width={width}
      height={height}
      margin={margin}
      seriesName='line-chart'
      data={data}
      displayXAccessor={displayXAccessor}
      xAccessor={xAccessor}
      xScale={xScale}
      xExtents={xExtents}
    >
      <Chart yExtents={yAccessor}>
        <XAxis axisAt='bottom' orient='bottom' ticks={6} />
        <YAxis axisAt='left' orient='left' ticks={6} />
        <CurrentCoordinate yAccessor={yAccessor} />
        <LineSeries yAccessor={yAccessor} strokeWidth={2} />
        <MouseCoordinateX at='bottom' orient='bottom' displayFormat={timeFormat('%Y-%m-%d %H:%M:%S')} />
        <MouseCoordinateY at='left' orient='right' displayFormat={format('.4f')} />
        <SingleValueTooltip yAccessor={yAccessor} yLabel={`Price`} yDisplayFormat={format('.4f')} origin={[0, -20]} />
      </Chart>
      <CrossHairCursor />
    </ChartCanvas>
  )
}

export default LineChart
