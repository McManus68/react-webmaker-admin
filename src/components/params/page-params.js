import React from 'react'
import PropTypes from 'prop-types'

import { get } from 'lodash'

import { useFormContext } from 'react-hook-form'

import './page-params.scss'

const PageParams = ({ page }) => {
  const { register, errors } = useFormContext()
  const params = ['title', 'slug', 'description']

  return (
    <table className='page-params'>
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
                  name={param}
                  type='text'
                  defaultValue={page[param]}
                  ref={register()}
                />
                {get(errors, `${param}.message`) && (
                  <p>{get(errors, `${param}.message`)}</p>
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