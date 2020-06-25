import React from 'react'
import PropTypes from 'prop-types'
import NumberInput from '../form/number-input'
import ParamsContainer from './params-container'

const ResponsiveParams = ({ path, responsive }) => {
  const breakpoints = ['sm', 'md', 'lg', 'xl']
  return (
    <ParamsContainer label='Responsive'>
      {breakpoints.map((breakpoint, i) => (
        <NumberInput
          key={i}
          name={`${path}.${breakpoint}`}
          label={breakpoint}
          defaultValue={responsive[breakpoint]}
        />
      ))}
    </ParamsContainer>
  )
}

export default ResponsiveParams

ResponsiveParams.propTypes = {
  path: PropTypes.string,
}
