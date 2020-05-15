import React from 'react'
import PropTypes from 'prop-types'

import { get } from 'lodash'

import { useFormContext } from 'react-hook-form'

function PageParams({ page, path }) {
  const { register, errors } = useFormContext()
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
                {get(errors, `${path}.${param}.message`) && (
                  <p>{get(errors, `${path}.${param}.message`)}</p>
                )}
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
