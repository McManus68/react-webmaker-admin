import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import NumberInput from '../form/number-input'
import SwitchInput from '../form/switch-input'
import SelectInput from '../form/select-input'
import ParamsContainer from './params-container'
import FieldSet from '../form/fieldset'

const AnimationParams = ({ path }) => {
  const directions = ['left', 'right', 'top', 'bottom']
  const animations = useSelector(state => state.config.animation)

  return (
    <ParamsContainer>
      <SelectInput name={`${path}.type`} label='Type' values={animations} />
      <NumberInput name={`${path}.delay`} label='Delay' />
      <FieldSet label='Direction'>
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
      </FieldSet>
    </ParamsContainer>
  )
}

export default AnimationParams

AnimationParams.propTypes = {
  path: PropTypes.string,
}
