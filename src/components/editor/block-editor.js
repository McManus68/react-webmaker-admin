import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'

import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

import './block-editor.scss'

const BlockEditor = ({ path }) => {
  const { control, register } = useFormContext()
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

  const newBlock = () => {
    return { type: 'BLOCK_SIMPLE_CONTENT', responsive: {}, params: {} }
  }

  const [state, setState] = useState(false)

  const config = useSelector(state => state.config.block)

  const blockTypes = config.map(item => item.type)

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

              <select
                name={`${path}[${i}].type`}
                ref={register()}
                onChange={e => onChangeType(field, e.target.value)}
                defaultValue={field.type}
              >
                {blockTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <h4>{field.type}</h4>
              <div className='block-editor-content'>
                <Params
                  component={field}
                  configType='BLOCK'
                  path={`${path}[${i}]`}
                />

                <ResponsiveParams path={`${path}[${i}].responsive`} />
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
