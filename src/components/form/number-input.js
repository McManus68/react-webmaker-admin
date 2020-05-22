import React from 'react'
import { useFormContext } from 'react-hook-form'

import './number-input.scss'

const NumberInput = ({ name, defaultValue }) => {
  const { register } = useFormContext()

  return (
    <input
      className='text-input'
      name={name}
      type='number'
      ref={register()}
      defaultValue={defaultValue}
    />
  )
}

export default NumberInput
