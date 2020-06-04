import React, { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'

import './text-input.scss'

const TextInput = ({ label, name, defaultValue }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <Controller
      as={<TextField inputRef={inputRef} variant='outlined' />}
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      defaultValue={defaultValue}
    />
  )
}

export default TextInput
