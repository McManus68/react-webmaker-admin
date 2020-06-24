import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import NumberInput from '../form/number-input'
import SwitchInput from '../form/switch-input'
import SelectInput from '../form/select-input'
import ParamsContainer from './params-container'
import FieldSet from '../form/fieldset'

const AnimationParams = ({ animation, path }) => {
  const directions = ['left', 'right', 'top', 'bottom']
  const animations = useSelector(state => state.config.animation)

  return (
    <ParamsContainer label='Animation'>
      <SelectInput
        name={`${path}.type`}
        label='Type'
        values={animations}
        defaultValue={animation.type}
      />
      <NumberInput name={`${path}.delay`} label='Delay' defaultValue={animation.delay} />
      <FieldSet label='Direction'>
        {directions.map((direction, i) => {
          return (
            <SwitchInput
              key={i}
              name={`${path}.${direction}`}
              label={direction}
              defaultValue={animation[direction]}
            />
          )
        })}
      </FieldSet>
    </ParamsContainer>
  )
}

export default AnimationParams

AnimationParams.propTypes = {
  path: PropTypes.string,
}
