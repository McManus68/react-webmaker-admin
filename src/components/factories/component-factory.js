import React from 'react'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import ImageInput from '../form/image-input'
import ColorInput from '../form/color-input'
import RadioInput from '../form/radio-input'

const ComponentFactory = ({ param, name }) => {
  console.log('ComponentFactory', param, name)
  switch (param.type) {
    case 'INT':
      return <NumberInput name={name} label={param.name} />
    case 'STRING':
      return <TextInput name={name} label={param.name} />
    case 'IMAGE':
      return <ImageInput name={name} config={param} />
    case 'COLOR':
      return <ColorInput name={name} label={param.name} />
    case 'RADIO':
      return (
        <RadioInput
          name={name}
          label={param.name}
          values={param.choiceValues}
        />
      )
    default:
      return <TextInput name={name} />
  }
}

export default ComponentFactory
