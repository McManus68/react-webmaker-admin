import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFormContext, useFieldArray } from 'react-hook-form'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

import './params.scss'

const Params = ({ component, path, configType }) => {
  const { register, setValue } = useFormContext()
  const configSection = useSelector(state => state.config.section)
  const configBlock = useSelector(state => state.config.block)

  const config =
    configType === 'SECTION'
      ? configSection.find(item => item.type === component.type)
      : configBlock.find(item => item.type === component.type)

  const [params, setParams] = useState(component.params)

  useEffect(() => {
    setParams(component.params || {})
  }, [component])

  const onDeleteParam = (name, i) => {
    var newParams = { ...params }
    newParams[name].splice(i, 1)
    setParams(newParams)

    newParams[name].forEach((param, i) =>
      setValue(`${path}.params.${name}[${i}]`, param)
    )
  }

  const onAddParam = name => {
    var newParams = { ...params }
    newParams[name].push('')
    setParams(newParams)
  }

  return (
    <div className='params'>
      <table>
        <thead>
          <tr>
            <th colSpan='2'>Parameters</th>
          </tr>
        </thead>
        <tbody>
          {configType === 'BLOCK' ? (
            <tr>
              <th>
                <label htmlFor={component.classes}>Classes CSS</label>
              </th>
              <td>
                <input
                  name={`${path}.classes`}
                  type='text'
                  ref={register()}
                  defaultValue={component.classes}
                />
              </td>
            </tr>
          ) : null}
          {config.params.map((c, i) => {
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
                      defaultValue={params[c.name]}
                      ref={register()}
                    />
                  ) : null}

                  {c.isArray
                    ? params[c.name] &&
                      params[c.name].map((value, i) => {
                        return (
                          <div className='params-array-item' key={i}>
                            <input
                              name={`${path}.params.${c.name}[${i}]`}
                              type={c.type === 'INT' ? 'number' : 'text'}
                              defaultValue={value}
                              ref={register()}
                            />
                            <FaTrashAlt
                              onClick={() => onDeleteParam(c.name, i)}
                            />
                          </div>
                        )
                      })
                    : null}
                  {c.isArray && (
                    <FaPlusCircle onClick={() => onAddParam(c.name)} />
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Params
