import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const ConfirmDialog = ({ open, title, description, onClose, onConfirm }) => {
  const onSubmit = () => {
    onConfirm()
    onClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='secondary' autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmDialog
