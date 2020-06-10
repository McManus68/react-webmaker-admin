import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const SwitchInput = ({ label, name, defaultValue }) => {
  const { control, getValues } = useFormContext()
  const inputRef = useRef()

  return (
    <Controller
      as={
        <FormControlLabel
          control={<Switch inputRef={inputRef} />}
          label='Primary'
        />
      }
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      variant='outlined'
      defaultValue={getValues(name) || defaultValue}
    />
  )
}

export default SwitchInput

SwitchInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
}
