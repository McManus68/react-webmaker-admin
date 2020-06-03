import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import SwitchInput from '../form/switch-input'

import './animation-params.scss'

const AnimationParams = ({ animation, path }) => {
  const { register } = useFormContext()
  const directions = ['left', 'right', 'top', 'bottom']

  if (animation == null) {
    animation = {}
  }

  return (
    <div className='params'>
      <TextInput name={`${path}.type`} label='Type' />
      <NumberInput name={`${path}.delay`} label='Delay' />

      {directions.map((direction, i) => {
        return (
          <SwitchInput
            key={i}
            name={`${path}.${direction}`}
            label={direction}
          />
        )
      })}
    </div>
  )
}

export default AnimationParams
