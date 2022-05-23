import { FC, useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import DialogContent from '@mui/material/DialogContent'
import { BootstrapDialog, BootstrapDialogTitle } from './BaseDialog'
import LineChart from 'components/LineChart'
import { CoinResponse, CryptoHistory } from 'types/main.d'
import { getCryptoHistory } from 'services/cryptoService'

interface Props {
  open: boolean
  crypto?: CoinResponse
  onClose: () => void
}

const CryptoHistoryDialog: FC<Props> = ({ open, crypto, onClose }) => {
  const [isFetchingHistory, setIsFetchingHistory] = useState(false)
  const [history, setHistory] = useState<CryptoHistory>()

  useEffect(() => {
    if (crypto) {
      setIsFetchingHistory(true)
      getCryptoHistory({
        id: crypto.id,
        onSuccess: data => {
          setHistory(data)
          setIsFetchingHistory(false)
        },
        onFail: error => {
          console.error(error)
          setIsFetchingHistory(false)
        }
      })
    }
  }, [crypto])

  const handleClose = () => {
    setHistory(undefined)
    onClose()
  }

  const renderHistory = () => {
    // No crypto is selected
    if (!crypto) {
      return <></>
    }

    // Fetching crypto history
    // - Show loading sign for first fetch only
    // - To avoid flashing dialog
    if (isFetchingHistory && !history) {
      return (
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      )
    }

    // Failed to fetch crypto history
    if (!history) {
      return <DialogContent>Failed to grab crypto history</DialogContent>
    }

    // Show crypto history
    return (
      <>
        <BootstrapDialogTitle id='crypto-dialog-title' onClose={handleClose}>
          {crypto.name} ({crypto.symbol.toUpperCase()}) - Past 24h price
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <LineChart initialData={history.prices.map(value => ({ date: value[0], volume: value[1] }))} />
        </DialogContent>
      </>
    )
  }

  return (
    <BootstrapDialog onClose={onClose} aria-labelledby='crypto-dialog-title' open={open}>
      {renderHistory()}
    </BootstrapDialog>
  )
}

export default CryptoHistoryDialog
