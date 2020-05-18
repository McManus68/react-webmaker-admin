import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

import './animation-params.scss'

const AnimationParams = ({ animation, path }) => {
  const { register, unregister, setValue, errors } = useFormContext()
  const directions = ['left', 'right', 'top', 'bottom']
  const [active, setActive] = useState(animation && animation.type)

  const toggleChecked = e => {
    setActive(e.target.checked)
  }

  if (animation == null) {
    animation = {}
  }

  return (
    <div>
      <label htmlFor='active'>Animate?</label>

      <input defaultChecked={active} onClick={toggleChecked} type='checkbox' />

      {active && (
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>
                <label htmlFor='type'>Type</label>
              </th>
              <td>
                <input
                  name={`${path}.type`}
                  ref={register()}
                  defaultValue={animation.type}
                  disabled={!active}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor='delay'>Delay</label>
              </th>
              <td>
                <input
                  name={`${path}.delay`}
                  type='number'
                  ref={register()}
                  defaultValue={animation.delay}
                  disabled={!active}
                />
              </td>
            </tr>

            {directions.map((direction, i) => {
              return (
                <tr key={i}>
                  <th>
                    <label htmlFor={direction}>{direction}</label>
                  </th>
                  <td>
                    <input
                      name={`${path}.${direction}`}
                      type='checkbox'
                      defaultChecked={animation[direction]}
                      ref={register()}
                      disabled={!active}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AnimationParams