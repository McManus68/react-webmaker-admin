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
import ArrayParams from '../params/array-param'
import styled from 'styled-components'

const ParamArray = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Params = ({ config, component, path, configType }) => {
  const { register, setValue } = useFormContext()

  const [state, setState] = useState(false)

  const onDelete = (name, i) => {
    var newParams = [...component.params]
    var param = newParams.find(param => param.name === name)
    param.value.splice(i, 1)
    //setParams(newParams)

    param.value.forEach((value, j) =>
      setValue(`${path}.params[${j}].value[${i}]`, value)
    )
  }

  const onAdd = (name, i) => {
    var value = component.params.find(param => param.name === name).value
    value.push('ddd')
    setValue(`${path}.params[${i}].value[0]`, 'dd')
    setState(!state)
  }

  console.log('component = ', component, 'config', config)
  return (
    <ParamsContainer row={configType === 'SECTION'}>
      {configType === 'BLOCK' ? (
        <TextInput
          name={`${path}.classes`}
          label='Classes CSS'
          defaultValue={component.classes}
        />
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
            {param.isArray ? (
              <ArrayParams
                path={`${path}.params[${i}]`}
                param={param}
                values={component.params.find(p => p.type === param.type).value}
                component={component}
              />
            ) : (
              <InputFactory param={param} name={`${path}.params[${i}].value`} />
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
