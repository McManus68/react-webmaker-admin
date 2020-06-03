import React from 'react'
import PropTypes from 'prop-types'
import NumberInput from '../form/number-input'

const ResponsiveParams = ({ path }) => {
  const breakpoints = ['sm', 'md', 'lg', 'xl']
  return (
    <div className='params'>
      {breakpoints.map((breakpoint, i) => {
        return (
          <NumberInput
            key={i}
            name={`${path}.${breakpoint}`}
            label={breakpoint}
          />
        )
      })}
    </div>
  )
}

export default ResponsiveParams
