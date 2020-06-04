import React, { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import FieldSet from '../form/fieldset'

import './radio-input.scss'

const RadioInput = ({ label, name, values }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <FieldSet label={label} className='radio-input'>
      <Controller
        as={
          <RadioGroup inputref={inputRef}>
            {values.map((value, i) => (
              <FormControlLabel
                key={i}
                value={value}
                control={<Radio />}
                label={value}
              />
            ))}
          </RadioGroup>
        }
        name={name}
        onFocus={() => inputRef.current.focus()}
        control={control}
      />
    </FieldSet>
  )
}

export default RadioInput
