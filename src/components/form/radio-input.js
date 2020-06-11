import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FieldSet from '../form/fieldset'

const RadioInput = ({ label, name, values, defaultValue }) => {
  const { control, getValues } = useFormContext()
  const inputRef = useRef()

  return (
    <FieldSet label={label}>
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
        defaultValue={getValues(name) || defaultValue}
      />
    </FieldSet>
  )
}

export default RadioInput

RadioInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
}

RadioInput.defaultProps = {
  values: [],
}
