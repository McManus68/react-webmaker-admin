import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'
import SelectType from '../form/select-type'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import {
  GenericEditor,
  Prepend,
  AddBefore,
  AddAfter,
  Remove,
} from '../../styles/mixin'
import styled from 'styled-components'

const BlockEditorParameters = styled.div`
  display: flex;
  flex-direction: row;
`

const BlockEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })
  const [state, setState] = useState(false)
  const config = useSelector(state => state.config.block)

  const getDefaultParams = type => {
    return config
      .find(item => item.type === type)
      .params.map(item => ({
        name: item.name,
        type: item.type,
        value: item.defaultValue,
      }))
  }

  const newBlock = () => {
    const type =
      scope === 'PAGE' ? 'BLOCK_SIMPLE_CONTENT' : 'FOOTER_SIMPLE_CONTENT'
    return {
      type: type,
      classes: '',
      responsive: { sm: 12, md: 6, lg: 6, xl: 6 },
      animation: {
        type: 'NONE',
        left: false,
        right: false,
        top: false,
        bottom: false,
      },
      params: getDefaultParams(type),
    }
  }

  const blockTypes = config
    .filter(item => item.scope === scope)
    .map(item => item.type)

  const onChangeType = (field, value) => {
    field.type = value
    field.params = getDefaultParams(field.type)
    setState(!state)
  }

  return (
    <>
      {!fields.length ? (
        <Prepend type='block'>
          <FaPlusCircle onClick={() => prepend(newBlock())} />
        </Prepend>
      ) : null}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='block'>
            <AddBefore type='block'>
              <FaPlusCircle onClick={() => insert(i, newBlock())} />
            </AddBefore>

            <SelectType
              name={`${path}[${i}].type`}
              values={blockTypes}
              onChange={onChangeType}
              field={field}
            />

            <BlockEditorParameters>
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
            </BlockEditorParameters>

            <Remove type='block'>
              <FaTrashAlt onClick={() => remove(i)} />
            </Remove>
            <AddAfter type='block'>
              <FaPlusCircle onClick={() => insert(i + 1, newBlock())} />
            </AddAfter>
          </GenericEditor>
        ))}
    </>
  )
}

export default BlockEditor
