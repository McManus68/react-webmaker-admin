import React from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'

const ParamsDialog = ({ open, field, path, onSave, onClose, children }) => {
  const { watch } = useFormContext()
  const newParams = watch(path)

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Parameters</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => onSave(field, newParams)} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ParamsDialog

ParamsDialog.propTypes = {}

ParamsDialog.defaultProps = {}
