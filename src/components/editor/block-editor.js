import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'
import SelectType from '../form/select-type'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor } from './controls'
import styled from 'styled-components'

const BlockEditorParameters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const BlockEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })
  const [state, setState] = useState(false)
  const config = useSelector(state => state.config.block)
  const defaultBlock = useSelector(state => state.config.default.block)

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
    return { ...defaultBlock, type: type, params: getDefaultParams(type) }
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
      {!fields.length && (
        <Prepend type='block' onClick={() => prepend(newBlock())} />
      )}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='block'>
            <AddBefore type='block' onClick={() => insert(i, newBlock())} />

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

            <Remove type='block' onClick={() => remove(i)} />
            <AddAfter type='block' onClick={() => insert(i + 1, newBlock())} />
          </GenericEditor>
        ))}
    </>
  )
}

export default BlockEditor
