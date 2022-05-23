import { FC, useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import DialogContent from '@mui/material/DialogContent'
import { BootstrapDialog, BootstrapDialogTitle } from './BaseDialog'
import { CoinResponse, CryptoHistory } from 'types/main.d'
import { getCryptoHistory } from 'services/cryptoService'

interface Props {
  crypto?: CoinResponse
  onClose: () => void
}

const CryptoHistoryDialog: FC<Props> = ({ crypto, onClose }) => {
  const [open, setOpen] = useState(false)
  const [isFetchingHistory, setIsFetchingHistory] = useState(false)
  const [history, setHistory] = useState<CryptoHistory>()

  useEffect(() => {
    // Open/Close modal
    setOpen(!!crypto)

    // Grab crypto history
    setHistory(undefined)
    setIsFetchingHistory(true)
    if (crypto) {
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

  const renderHistory = () => {
    // No crypto is selected
    if (!crypto) {
      return <></>
    }

    // Fetching crypto history
    if (isFetchingHistory) {
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
        <BootstrapDialogTitle id='crypto-dialog-title' onClose={onClose}>
          {crypto.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>{JSON.stringify(history)}</DialogContent>
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
