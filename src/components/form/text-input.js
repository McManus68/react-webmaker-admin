import React from 'react'
import { useFormContext } from 'react-hook-form'

import './text-input.scss'

const TextInput = ({ name, defaultValue }) => {
  const { register } = useFormContext()

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
