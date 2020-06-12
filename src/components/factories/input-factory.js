import React from 'react'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import ImageInput from '../form/image-input'
import ColorInput from '../form/color-input'
import RadioInput from '../form/radio-input'

const InputFactory = ({ param, name }) => {
  const props = {
    name: name,
    label: param.name,
    defaultValue: param.defaultValue,
  }

  switch (param.type) {
    case 'NUMBER':
      return <NumberInput {...props} />
    case 'TEXT':
      return <TextInput {...props} />
    case 'IMAGE':
      return <ImageInput {...props} config={param} />
    case 'COLOR':
      return <ColorInput {...props} />
    case 'RGBA':
      return <ColorInput {...props} rgba />
    case 'RADIO':
      return <RadioInput {...props} values={param.choiceValues} />
    default:
      return <TextInput {...props} />
  }
}

export default InputFactory
