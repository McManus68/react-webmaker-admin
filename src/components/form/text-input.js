import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField, ThemeProvider, createMuiTheme } from '@material-ui/core'

import './text-input.scss'

const TextInput = ({ name, defaultValue }) => {
  const { register } = useFormContext()
  const inputRef = useRef()

  return (
    <input
      className='text-input'
      name={name}
      type='text'
      ref={register()}
      defaultValue={defaultValue}
    />
  )
}

export default TextInput
