import React, { useEffect } from 'react'
import { useForm, FormContext, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import styled from 'styled-components'

const ParamsDialog = ({ defaultValues, open, onSave, onClose, children }) => {
  const methods = useForm({
    defaultValues: defaultValues,
  })

  const onSubmit = (data, e) => {
    console.log('Submit event', JSON.stringify(data))
    onSave(data)
    onClose()
  }

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  return (
    <FormContext {...methods}>
      <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Parameters</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={methods.handleSubmit(onSubmit)} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </FormContext>
  )
}

export default ParamsDialog

ParamsDialog.propTypes = {}

ParamsDialog.defaultProps = {}
