import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import InputFactory from '../factories/input-factory'
import ParamsContainer from './params-container'
import ArrayParams from '../params/array-param'

const Params = ({ path, component, type }) => {
  const config = useSelector(state => state.config)[type].find(c => c.type === component.type)
  return (
    <ParamsContainer label='Parameters'>
      {config.params.map((param, i) => {
        return (
          <div key={i}>
            {param.isArray ? (
              <ArrayParams path={`${path}][${i}].value`} param={param} />
            ) : (
              <InputFactory param={param} name={`${path}[${i}].value`} />
            )}
          </div>
        )
      })}
    </ParamsContainer>
  )
}

export default Params

Params.propTypes = {
  path: PropTypes.string,
  component: PropTypes.object,
  type: PropTypes.string,
}
