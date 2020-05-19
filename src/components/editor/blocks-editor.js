import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

const BlocksEditor = ({ path }) => {
  const { control } = useFormContext()
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
