import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

import './block-editor.scss'

const BlockEditor = ({ path }) => {
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
      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='block-editor'>
              <div className='add-before'>
                <FaPlusCircle onClick={() => insert(i, newBlock())} />
              </div>
              <h4>{field.type}</h4>
              <div className='block-editor-content'>
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
              <div className='remove'>
                <FaTrashAlt onClick={() => remove(i)} />
              </div>
              <div className='add-after'>
                <FaPlusCircle onClick={() => insert(i + 1, newBlock())} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BlockEditor
