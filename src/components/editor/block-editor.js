import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'

import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import SelectType from '../form/select-type'

import './block-editor.scss'

const BlockEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

  const newBlock = () => {
    return {
      type: scope === 'PAGE' ? 'BLOCK_SIMPLE_CONTENT' : 'FOOTER_SIMPLE_CONTENT',
      responsive: { sm: 12, md: 6, lg: 6, xl: 6 },
      animation: {
        type: '',
        left: false,
        right: false,
        top: false,
        bottom: false,
      },
      params: {},
    }
  }

  const [state, setState] = useState(false)

  const config = useSelector(state => state.config.block)
  const blockTypes = config
    .filter(item => item.scope === scope)
    .map(item => item.type)

  const onChangeType = (field, value) => {
    field.type = value
    setState(!state)
  }

  return (
    <div>
      <div className='prepend-block'>
        {!fields.length ? (
          <FaPlusCircle onClick={() => prepend(newBlock())} />
        ) : null}
      </div>
      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='block-editor'>
              <div className='add-before'>
                <FaPlusCircle onClick={() => insert(i, newBlock())} />
              </div>

              <SelectType
                name={`${path}[${i}].type`}
                values={blockTypes}
                onChange={onChangeType}
                field={field}
              />

              <div className='block-editor-content'>
                <Params
                  component={field}
                  config={config.find(c => c.type === field.type)}
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
