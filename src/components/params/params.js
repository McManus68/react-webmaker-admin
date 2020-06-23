import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import InputFactory from '../factories/input-factory'
import ParamsContainer from './params-container'
import TextInput from '../form/text-input'
import ArrayParams from '../params/array-param'

const Params = ({ config, component }) => {
  return (
    <ParamsContainer>
      {config.params.map((param, i) => {
        return (
          <div key={i}>
            {param.isArray ? (
              <ArrayParams
                path={`params[${i}].value`}
                param={param}
                values={component.params.find(p => p.type === param.type).value}
                component={component}
              />
            ) : (
              <InputFactory param={param} name={`params[${i}].value`} />
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
