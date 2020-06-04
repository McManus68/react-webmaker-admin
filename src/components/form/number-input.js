import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'

import './number-input.scss'

const NumberInput = ({ label, name, defaultValue }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <Controller
      as={<TextField inputRef={inputRef} type='number' />}
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      variant='outlined'
      defaultValue={defaultValue}
    />
  )
}

export default NumberInput
