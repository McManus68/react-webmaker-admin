import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormContext, useFieldArray } from 'react-hook-form'

import TrashIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import ImageInput from '../form/image-input'
import ColorInput from '../form/color-input'
import ChoiceInput from '../form/choice-input'
import RadioInput from '../form/radio-input'

import './params.scss'

const Params = ({ component, path, configType }) => {
  const { register, setValue } = useFormContext()
  const configSection = useSelector(state => state.config.section)
  const configBlock = useSelector(state => state.config.block)

  const config =
    configType === 'SECTION'
      ? configSection.find(item => item.type === component.type)
      : configBlock.find(item => item.type === component.type)

  const [params, setParams] = useState(component.params)

  useEffect(() => {
    setParams(component.params || {})
  }, [component])

  const onDeleteParam = (name, i) => {
    var newParams = { ...params }
    newParams[name].splice(i, 1)
    setParams(newParams)

    newParams[name].forEach((param, i) =>
      setValue(`${path}.params.${name}[${i}]`, param)
    )
  }

  const onAddParam = name => {
    var newParams = { ...params }
    if (!newParams[name]) {
      newParams[name] = []
    }
    newParams[name].push('')
    setParams(newParams)
  }

  const getComponent = (config, name, defaultValue) => {
    switch (config.type) {
      case 'INT':
        return <NumberInput name={name} label={config.name} />
      case 'STRING':
        return <TextInput name={name} label={config.name} />
      case 'IMAGE':
        return (
          <ImageInput
            name={name}
            label={config.name}
            defaultValue={defaultValue}
          />
        )
      case 'COLOR':
        return <ColorInput name={name} label={config.name} />
      case 'CHOICE':
        return (
          <RadioInput
            name={name}
            label={config.name}
            values={config.choiceValues}
          />
        )
      default:
        return <TextInput name={name} defaultValue={defaultValue} />
    }
  }

  return (
    <div className='params'>
      {configType === 'BLOCK' ? (
        <TextInput name={`${path}.classes`} label='Classes CSS' />
      ) : null}
      {config.params.map((c, i) => {
        return (
          <div>
            {!c.isArray
              ? getComponent(c, `${path}.params.${c.name}`, params[c.name])
              : null}

            {c.isArray
              ? params[c.name] &&
                params[c.name].map((value, i) => {
                  return (
                    <div className='params-array-item' key={i}>
                      {getComponent(c, `${path}.params.${c.name}[${i}]`, value)}
                      <IconButton onClick={() => onDeleteParam(c.name, i)}>
                        <TrashIcon />
                      </IconButton>
                    </div>
                  )
                })
              : null}
            {c.isArray && (
              <IconButton onClick={() => onAddParam(c.name)}>
                <AddIcon />
              </IconButton>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Params
