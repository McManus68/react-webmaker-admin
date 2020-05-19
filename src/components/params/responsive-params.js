import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

const ResponsiveParams = ({ responsive, path }) => {
  const { register } = useFormContext()
  const breakpoints = ['sm', 'md', 'lg', 'xl']
  return (
    <table>
      <thead>
        <tr>
          <th colSpan='2'>Responsive</th>
        </tr>
      </thead>
      <tbody>
        {breakpoints.map((breakpoint, i) => {
          return (
            <tr key={i}>
              <th>
                <label htmlFor={breakpoint}>{breakpoint}</label>
              </th>
              <td>
                <input
                  name={`${path}.${breakpoint}`}
                  type='number'
                  defaultValue={responsive[breakpoint]}
                  ref={register()}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ResponsiveParams
