import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import InputFactory from '../factories/input-factory'
import ParamsContainer from './params-container'
import TextInput from '../form/text-input'
import ArrayParams from '../params/array-param'

const Params = ({ config, component, path, configType }) => {
  const { register } = useFormContext()

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
                path={`${path}.params[${i}].value`}
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
