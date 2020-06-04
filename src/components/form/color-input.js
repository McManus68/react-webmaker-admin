import React, { useState, useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/icons/Palette'
import { TextField } from '@material-ui/core'

import { SketchPicker } from 'react-color'

import './color-input.scss'

const ColorInput = ({ label, name }) => {
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState('')
  const { control, setValue } = useFormContext()
  const inputRef = useRef()

  const selectColor = value => {
    setColor(
      `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
    )
    setValue(name, color)
  }

  return (
    <div className='color-input'>
      <Controller
        as={
          <TextField
            inputRef={inputRef}
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <div
                    className='color-sample'
                    style={{ backgroundColor: color }}
                  />
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
      />

      <SketchPicker
        className={visible ? 'visible' : ''}
        onChangeComplete={selectColor}
      />
    </div>
  )
}

export default ColorInput
