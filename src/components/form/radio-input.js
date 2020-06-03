import React, { useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import './radio-input.scss'

const RadioInput = ({ label, name, values }) => {
  const { control } = useFormContext()
  const inputRef = useRef()

  return (
    <FormControl className='radio-input'>
      <Controller
        as={
          <RadioGroup inputRef={inputRef}>
            {values.map((value, i) => (
              <FormControlLabel
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
    </FormControl>
  )
}

export default RadioInput
