import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import NumberInput from '../form/number-input'
import SwitchInput from '../form/switch-input'
import SelectInput from '../form/select-input'

import ParamsContainer from './params-container'

import './animation-params.scss'

const AnimationParams = ({ animation, path }) => {
  const directions = ['left', 'right', 'top', 'bottom']
  const animations = useSelector(state => state.config.animation)
  if (animation == null) {
    animation = {}
  }

  return (
    <ParamsContainer>
      <SelectInput name={`${path}.type`} label='Type' values={animations} />
      <NumberInput name={`${path}.delay`} label='Delay' />
      <FormControl component='fieldset' className='fieldset'>
        <FormLabel component='legend'>Direction</FormLabel>
        <div>
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
      </FormControl>
    </ParamsContainer>
  )
}

export default AnimationParams
