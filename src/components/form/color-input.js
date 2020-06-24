import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/icons/Palette'
import { TextField } from '@material-ui/core'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

const ColorSample = styled.div`
  width: 16px;
  height: 16px;
  padding: 0.4rem;
  background-color: ${props => props.color};
`
const StyledColorPicker = styled(SketchPicker)`
  visibility: hidden;
  position: absolute;
  transition: 0.4s;
  left: 280px;
  top: 80px;
  z-index: 2;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`

const ColorInput = ({ label, name, defaultValue, rgba }) => {
  const { getValues } = useFormContext()
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState(getValues(name) || '')
  const { control, setValue } = useFormContext()
  const inputRef = useRef()

  const selectColor = value => {
    setColor(rgba ? `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})` : value.hex)
    setValue(name, color)
  }

  return (
    <>
      <Controller
        as={
          <TextField
            inputRef={inputRef}
            variant='outlined'
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <ColorSample color={color} />
                  <IconButton onClick={() => setVisible(!visible)}>
                    <Icon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        }
        name={name}
        label={label}
        onFocus={() => inputRef.current.focus()}
        control={control}
        defaultValue={getValues(name) || defaultValue || ''}
      />

      <StyledColorPicker visible={visible} onChange={selectColor} />
    </>
  )
}

export default ColorInput

ColorInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rgba: PropTypes.bool,
}

ColorInput.defaultProps = {
  rgba: false,
}
