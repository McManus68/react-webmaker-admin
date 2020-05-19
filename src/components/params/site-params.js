import React from 'react'
import { useFormContext } from 'react-hook-form'

const SiteParams = ({ site }) => {
  const { register, errors } = useFormContext()
  const params = ['name', 'title', 'description']
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
                  name={param}
                  defaultValue={site[param]}
                  ref={register()}
                />
                {errors[param] && <p>{errors[param].message}</p>}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default SiteParams
