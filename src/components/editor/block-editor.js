import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'
import SelectType from '../form/select-type'
import GenericEditor from './generic-editor'

const BlockEditor = ({ path, scope }) => {
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
      responsive: { sm: 12, md: 6, lg: 6, xl: 6 },
      animation: {
        type: '',
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

  const getContent = (field, i) => {
    return (
      <>
        <SelectType
          name={`${path}[${i}].type`}
          values={blockTypes}
          onChange={onChangeType}
          field={field}
        />

        <Params
          component={field}
          config={config.find(c => c.type === field.type)}
          configType='BLOCK'
          path={`${path}[${i}]`}
        />

        <ResponsiveParams path={`${path}[${i}].responsive`} />
        <AnimationParams path={`${path}[${i}].animation`} />
      </>
    )
  }

  return (
    <GenericEditor
      path={path}
      getContent={getContent}
      type='BLOCK'
      newObj={newBlock}
    ></GenericEditor>
  )
}

export default BlockEditor
