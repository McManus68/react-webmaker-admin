import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import './fieldset.scss'

const FieldSet = ({ children, label, className }) => {
  return (
    <FormControl component='fieldset' className={`fieldset ${className}`}>
      <FormLabel component='legend'>{label}</FormLabel>
      {children}
    </FormControl>
  )
}

export default FieldSet
