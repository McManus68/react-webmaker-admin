import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'

const NumberInput = ({ label, name, variant }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <Controller
      as={<TextField inputRef={inputRef} type='number' />}
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      variant={variant}
      defaultValue={0}
    />
  )
}

export default NumberInput

NumberInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'standard', 'outlined']),
}

NumberInput.defaultProps = {
  variant: 'outlined',
}
