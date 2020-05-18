import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  useForm,
  FormContext,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'

import ResponsiveParams from './responsive-params'
import AnimationParams from './animation-params'
import Params from './params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

function BlocksEditor({ path }) {
  const { control, register } = useFormContext()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

  const newBlock = () => {
    return { type: 'BLOCK', responsive: {}, params: {} }
  }

  return (
    <div>
      <FaPlusCircle onClick={() => prepend(newBlock())} />

      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='page-editor-block-container'>
              <h4>{field.type}</h4>
              <div className='page-editor-block-content'>
                <Params
                  component={field}
                  configType='BLOCK'
                  path={`${path}[${i}]`}
                />

                <ResponsiveParams
                  responsive={field.responsive}
                  path={`${path}[${i}].responsive`}
                />
                <AnimationParams
                  animation={field.animation}
                  path={`${path}[${i}].animation`}
                />
              </div>
              <FaTrashAlt onClick={() => remove(i)} />
            </div>
            <FaPlusCircle onClick={() => insert(i + 1, newBlock())} />
          </div>
        ))}
    </div>
  )
}

export default BlocksEditor
