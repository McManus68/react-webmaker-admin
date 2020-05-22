import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/icons/Palette'

import { SketchPicker } from 'react-color'

import './color-input.scss'

const ColorInput = ({ name, defaultValue }) => {
  const [visible, setVisible] = useState(false)
  const { register, setValue } = useFormContext()

  const selectColor = value => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
    console.log('value', value)
    setValue(name, color)
  }

  return (
    <div className='image-input'>
      <input name={name} ref={register()} defaultValue={defaultValue} />
      <IconButton
        className='icon-set-color'
        onClick={() => setVisible(!visible)}
      >
        <Icon />
      </IconButton>

      <SketchPicker
        className={visible ? 'visible' : ''}
        onChangeComplete={selectColor}
      />
    </div>
  )
}

export default ColorInput
