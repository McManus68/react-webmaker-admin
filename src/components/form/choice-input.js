import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import './choice-input.scss'

const ChoiceInput = ({ name, defaultValue, values }) => {
  const { register } = useFormContext()

  return values.map((value, i) => {
    return (
      <div className='choice-input' key={i}>
        <label htmlFor={name}>{value}</label>
        <input
          name={name}
          id={name}
          type='radio'
          ref={register}
          value={value}
          defaultChecked={defaultValue === value}
        />
      </div>
    )
  })
}

export default ChoiceInput
