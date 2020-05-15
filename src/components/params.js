import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'

const DynamicParams = ({ component, path, configType }) => {
  const { register } = useFormContext()
  const globalConfig = useSelector(state => state.config.config)
  const config = globalConfig[configType][component.type]

  return (
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td>
            <input
              name={`${path}.type`}
              type='hidden'
              ref={register}
              defaultValue={component.type}
            />
          </td>
        </tr>
        {configType === 'BLOCK' ? (
          <tr>
            <th>
              <label htmlFor={component.classes}>Classes CSS</label>
            </th>
            <td>
              <input
                name={`${path}.classes`}
                type='text'
                ref={register}
                defaultValue={component.classes}
              />
            </td>
          </tr>
        ) : null}
        {config &&
          config.map((c, i) => {
            return (
              <tr key={i}>
                <th>
                  <label htmlFor={c.name}>{c.name}</label>
                </th>
                <td>
                  {!c.isArray ? (
                    <input
                      name={`${path}.params.${c.name}`}
                      type={c.type === 'INT' ? 'number' : 'text'}
                      defaultValue={component.params[c.name]}
                      ref={register}
                    />
                  ) : null}

                  {c.isArray
                    ? component.params[c.name].map((value, i) => {
                        return (
                          <input
                            key={i}
                            name={`${path}.params.${c.name}.${i}`}
                            type={c.type === 'INT' ? 'number' : 'text'}
                            defaultValue={value}
                            ref={register}
                          />
                        )
                      })
                    : null}
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default DynamicParams
