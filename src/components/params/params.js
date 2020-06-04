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
  const { setValue } = useFormContext()

  const [params, setParams] = useState(component.params)

  useEffect(() => {
    setParams(component.params || {})
  }, [component])

  const onDelete = (name, i) => {
    var newParams = { ...params }
    newParams[name].splice(i, 1)
    setParams(newParams)

    newParams[name].forEach((param, i) =>
      setValue(`${path}.params.${name}[${i}]`, param)
    )
  }

  const onAdd = name => {
    var newParams = { ...params }
    if (!newParams[name]) {
      newParams[name] = []
    }
    newParams[name].push('')
    setParams(newParams)
  }

  return (
    <ParamsContainer column={configType === 'BLOCK'}>
      {configType === 'BLOCK' ? (
        <TextInput name={`${path}.classes`} label='Classes CSS' />
      ) : null}
      {config.params.map((param, i) => {
        return (
          <div key={i}>
            {!param.isArray ? (
              <ComponentFactory
                param={param}
                name={`${path}.params.${param.name}`}
              />
            ) : (
              <FieldSet label={param.name}>
                {params[param.name] &&
                  params[param.name].map((value, i) => {
                    return (
                      <div key={i} className='array-param'>
                        <ComponentFactory
                          param={param}
                          name={`${path}.params.${param.name}[${i}]`}
                        />
                        <IconButton onClick={() => onDelete(param.name, i)}>
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
