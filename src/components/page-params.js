import React from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

function PageParams({ page, path }) {
  const { register } = useFormContext()
  const params = ['title', 'slug', 'description']

  return (
    <table>
      <thead></thead>
      <tbody>
        {params.map((param, i) => {
          return (
            <tr key={i}>
              <th>
                <label htmlFor={param}>{param}</label>
              </th>
              <td>
                <input
                  name={`${path}.${param}`}
                  type='text'
                  defaultValue={page[param]}
                  ref={register}
                />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default PageParams

PageParams.propTypes = {}
