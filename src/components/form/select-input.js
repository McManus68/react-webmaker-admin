import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

const SelectInput = ({ label, name, values, variant }) => {
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
      variant={variant}
    />
  )
}

export default SelectInput

SelectInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  variant: PropTypes.oneOf(['filled', 'standard', 'outlined']),
}

SelectInput.defaultProps = {
  values: [],
  variant: 'outlined',
}
