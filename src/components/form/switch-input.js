import React, { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import './radio-input.scss'

const SwitchInput = ({ label, name, defaultValue }) => {
  const { control } = useFormContext()
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
      className='switch-input'
      defaultValue={defaultValue}
    />
  )
}

export default SwitchInput
