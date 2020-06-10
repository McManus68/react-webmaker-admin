import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import TrashIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputFactory from '../factories/input-factory'
import ParamsContainer from './params-container'
import TextInput from '../form/text-input'
import FieldSet from '../form/fieldset'
import styled from 'styled-components'

const ParamArray = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Params = ({ config, component, path, configType, row }) => {
  const { register, setValue } = useFormContext()
  const [params, setParams] = useState(component.params)

  useEffect(() => {
    setParams(component.params || [])
  }, [component.params])

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
    console.log('all params', params, component.params)
    var newParams = [...params]
    var param = newParams.find(param => param.name === name)

    console.log('onAdd', name, newParams)
    if (!param.value) {
      param.value = []
    }
    param.value.push('')
    setParams(newParams)
  }

  return (
    <ParamsContainer row={row}>
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
              <InputFactory param={param} name={`${path}.params[${i}].value`} />
            ) : (
              <FieldSet label={param.name}>
                {params &&
                  params.find(p => p.type === param.type) &&
                  params.find(p => p.type === param.type).value &&
                  params
                    .find(p => p.type === param.type)
                    .value.map((v, j) => {
                      return (
                        <ParamArray key={j}>
                          <InputFactory
                            param={param}
                            name={`${path}.params[${i}].value[${j}]`}
                          />
                          <IconButton onClick={() => onDelete(param.name, j)}>
                            <TrashIcon />
                          </IconButton>
                        </ParamArray>
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

Params.propTypes = {
  config: PropTypes.object,
  component: PropTypes.object,
  path: PropTypes.string,
  configType: PropTypes.string,
  row: PropTypes.bool,
}

Params.defaultProps = {
  row: false,
}
