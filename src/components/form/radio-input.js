import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import styled from 'styled-components'

const StyledRadioInput = styled.div`
  .MuiFormGroup-root {
    flex-direction: row;
    flex-wrap: wrap;
  }
  padding: 0.6rem 1rem;
`

const RadioInput = ({ label, name, values, defaultValue }) => {
  const { control, getValues } = useFormContext()
  const inputRef = useRef()

  return (
    <StyledRadioInput>
      <Controller
        as={
          <RadioGroup inputref={inputRef}>
            {values.map((value, i) => (
              <FormControlLabel
                key={i}
                value={value}
                control={<Radio size='small' />}
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
    </StyledRadioInput>
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
