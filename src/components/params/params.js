import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import TrashIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import ComponentFactory from '../factories/component-factory'
import ParamsContainer from './params-container'
import TextInput from '../form/text-input'
import FieldSet from '../form/fieldset'

import './params.scss'

const Params = ({ config, component, path, configType }) => {
  const { register, setValue } = useFormContext()

  const [params, setParams] = useState(component.params)

  useEffect(() => {
    setParams(component.params || {})
  }, [component])

  const onDelete = (name, i) => {
    var newParams = [...params]
    var param = newParams.find(param => param.name === name)
    param.value.splice(i, 1)
    setParams(newParams)

    param.value.forEach((value, j) =>
      setValue(`${path}.params[${j}].value[${i}]`, value)
    )
  }

  const onAdd = name => {
    var newParams = [...params]
    var param = newParams.find(param => param.name === name)
    if (!param.value) {
      param.value = []
    }
    param.value.push('')
    setParams(newParams)
  }

  console.log('PARAMS', params)
  return (
    <ParamsContainer column={configType === 'BLOCK'}>
      {configType === 'BLOCK' ? (
        <TextInput name={`${path}.classes`} label='Classes CSS' />
      ) : null}
      {config.params.map((param, i) => {
        return (
          <div key={i}>
            <input
              name={`${path}.params[${i}].name`}
              type='hidden'
              ref={register()}
              defaultValue={param.name}
            />
            <input
              name={`${path}.params[${i}].type`}
              type='hidden'
              ref={register()}
              defaultValue={param.type}
            />
            {!param.isArray ? (
              <ComponentFactory
                param={param}
                name={`${path}.params[${i}].value`}
              />
            ) : (
              <FieldSet label={param.name}>
                {params &&
                  params.find(p => p.type === param.type) &&
                  params.find(p => p.type === param.type).value &&
                  params
                    .find(p => p.type === param.type)
                    .value.map((v, j) => {
                      return (
                        <div key={j} className='array-param'>
                          <ComponentFactory
                            param={param}
                            name={`${path}.params[${i}].value[${j}]`}
                          />
                          <IconButton onClick={() => onDelete(param.name, j)}>
                            <TrashIcon />
                          </IconButton>
                        </div>
                      )
                    })}
                <IconButton onClick={() => onAdd(param.name)}>
                  <AddIcon />
                </IconButton>
              </FieldSet>
            )}
          </div>
        )
      })}
    </ParamsContainer>
  )
}

export default Params
