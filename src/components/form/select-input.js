import React, { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

import './number-input.scss'

const SelectInput = ({ label, name, values }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <Controller
      as={
        <TextField inputRef={inputRef} select>
          {values.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      }
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      variant='outlined'
    />
  )
}

export default SelectInput
