import React from 'react'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import ImageInput from '../form/image-input'
import ColorInput from '../form/color-input'
import RadioInput from '../form/radio-input'

const InputFactory = ({ param, name }) => {
  switch (param.type) {
    case 'INT':
      return (
        <NumberInput
          name={name}
          label={param.name}
          defaultValue={param.defaultValue}
        />
      )
    case 'STRING':
      return (
        <TextInput
          name={name}
          label={param.name}
          defaultValue={param.defaultValue}
        />
      )
    case 'IMAGE':
      return (
        <ImageInput
          name={name}
          config={param}
          defaultValue={param.defaultValue}
        />
      )
    case 'COLOR':
      return (
        <ColorInput
          name={name}
          label={param.name}
          defaultValue={param.defaultValue}
        />
      )
    case 'RADIO':
      return (
        <RadioInput
          name={name}
          label={param.name}
          values={param.choiceValues}
          defaultValue={param.defaultValue}
        />
      )
    default:
      return <TextInput name={name} defaultValue={param.defaultValue} />
  }
}

export default InputFactory
