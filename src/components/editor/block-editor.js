import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'
import { Row, Col } from 'react-bootstrap'
import SelectType from '../form/select-type'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor, Settings } from './controls'
import FactoryBlock from '@bit/mcmanus68.webmaker.factory.factory-block'
import ParamsDialog from '../params/params-dialog'
import EditorControls from './editor-controls'
import styled from 'styled-components'

const BlockEditorParameters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const StyledBlock = styled(FactoryBlock)`
  border: 2px solid gree;
`

const BlockEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })
  const [state, setState] = useState(false)
  const [openBlockId, setOpenBlockId] = useState(-1)
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

  const onSave = (field, newParams) => {
    field.params = newParams
    setOpenBlockId(-1)
    setState(!state)
  }

  const onClose = () => setOpenBlockId(-1)

  const newBlock = () => {
    const type = scope === 'PAGE' ? 'BLOCK_SIMPLE_CONTENT' : 'FOOTER_SIMPLE_CONTENT'
    return { ...defaultBlock, type: type, params: getDefaultParams(type) }
  }

  return (
    <>
      {!fields.length && <Prepend type='block' onClick={() => prepend(newBlock())} />}

      {fields &&
        fields.map((field, i) => (
          <>
            <input name={`${path}[${i}].type`} type='hidden' ref={register()} />

            <FactoryBlock key={i} block={field}>
              <EditorControls
                type='block'
                field={field}
                index={i}
                remove={remove}
                insert={insert}
                newObj={newBlock}
                settings={setOpenBlockId}
              />
            </FactoryBlock>

            {openBlockId === field.id ? (
              <ParamsDialog
                field={field}
                path={`${path}[${i}].params`}
                onSave={onSave}
                onClose={onClose}
              >
                <Params
                  component={field}
                  config={config.find(c => c.type === field.type)}
                  configType='BLOCK'
                  path={`${path}[${i}]`}
                />

                <ResponsiveParams responsive={field.responsive} path={`${path}[${i}].responsive`} />
                <AnimationParams animation={field.animation} path={`${path}[${i}].animation`} />
              </ParamsDialog>
            ) : null}
          </>
        ))}
    </>
  )
}

export default BlockEditor
