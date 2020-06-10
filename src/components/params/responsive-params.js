import React from 'react'
import PropTypes from 'prop-types'
import NumberInput from '../form/number-input'
import ParamsContainer from './params-container'

const ResponsiveParams = ({ path }) => {
  const breakpoints = ['sm', 'md', 'lg', 'xl']
  return (
    <ParamsContainer>
      {breakpoints.map((breakpoint, i) => (
        <NumberInput
          key={i}
          name={`${path}.${breakpoint}`}
          label={breakpoint}
        />
      ))}
    </ParamsContainer>
  )
}

export default ResponsiveParams

ResponsiveParams.propTypes = {
  path: PropTypes.string,
}
