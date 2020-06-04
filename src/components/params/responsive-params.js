import React from 'react'
import NumberInput from '../form/number-input'

import ParamsContainer from './params-container'

const ResponsiveParams = ({ path }) => {
  const breakpoints = ['sm', 'md', 'lg', 'xl']
  return (
    <ParamsContainer>
      {breakpoints.map((breakpoint, i) => {
        return (
          <NumberInput
            key={i}
            name={`${path}.${breakpoint}`}
            label={breakpoint}
          />
        )
      })}
    </ParamsContainer>
  )
}

export default ResponsiveParams
