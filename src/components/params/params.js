import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormContext, useFieldArray } from 'react-hook-form'

import TrashIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import TextInput from '../form/text-input'
import NumberInput from '../form/number-input'
import ImageInput from '../form/image-input'
import ColorInput from '../form/color-input'
import RadioInput from '../form/radio-input'

import ParamsContainer from './params-container'

import './params.scss'

const Params = ({ component, path, configType }) => {
  const { register, setValue } = useFormContext()
  const configsSection = useSelector(state => state.config.section)
  const configsBlock = useSelector(state => state.config.block)

  const configs =
    configType === 'SECTION'
      ? configsSection.find(item => item.type === component.type)
      : configsBlock.find(item => item.type === component.type)

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
          <ImageInput name={name} config={config} defaultValue={defaultValue} />
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
    <ParamsContainer>
      {configType === 'BLOCK' ? (
        <TextInput name={`${path}.classes`} label='Classes CSS' />
      ) : null}
      {configs.params.map((config, i) => {
        return (
          <div>
            {!config.isArray ? (
              getComponent(
                config,
                `${path}.params.${config.name}`,
                params[config.name]
              )
            ) : (
              <FormControl component='fieldset' className='fieldset'>
                <FormLabel component='legend'>{config.name}</FormLabel>
                {params[config.name] &&
                  params[config.name].map((value, i) => {
                    return (
                      <div className='array-param'>
                        {getComponent(
                          config,
                          `${path}.params.${config.name}[${i}]`,
                          value
                        )}
                        <IconButton
                          onClick={() => onDeleteParam(config.name, i)}
                        >
                          <TrashIcon />
                        </IconButton>
                      </div>
                    )
                  })}
                <IconButton onClick={() => onAddParam(config.name)}>
                  <AddIcon />
                </IconButton>
              </FormControl>
            )}
          </div>
        )
      })}
    </ParamsContainer>
  )
}

export default Params
