import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useFormContext } from 'react-hook-form'

const AnimationParams = ({ animation, path }) => {
  const { register } = useFormContext()
  const directions = ['left', 'right', 'top', 'bottom']
  const [active, setActive] = useState(animation ? true : false)

  const toggleChecked = () => {
    setActive(!active)
    animation = active ? {} : null

    console.log('STATUS', animation, active)
  }

  return (
    <div>
      <label htmlFor='active'>Animate?</label>
      <input
        name={`${path}`}
        type='checkbox'
        ref={register}
        onClick={toggleChecked}
        defaultValue={active}
      />

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
                  ref={register}
                  defaultValue={animation.type}
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
                  ref={register}
                  defaultValue={animation.delay}
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
                      type='text'
                      defaultValue={animation[direction]}
                      ref={register}
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
