import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'

const TextInput = ({ label, name, variant }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  console.log('label', label, 'name', name, 'inputRef', inputRef.current)
  return (
    <Controller
      as={<TextField inputRef={inputRef} variant={variant} />}
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      defaultValue=''
    />
  )
}

export default TextInput

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'standard', 'outlined']),
}

TextInput.defaultProps = {
  variant: 'outlined',
}
