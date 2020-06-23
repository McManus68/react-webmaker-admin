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

const BlockEditor = ({ path, block, scope, index }) => {
  const [openBlockId, setOpenBlockId] = useState(-1)
  const config = useSelector(state => state.config.block)
  const defaultBlock = useSelector(state => state.config.default.block)

  const onSave = (field, newParams) => {
    field.params = newParams
    setOpenBlockId(-1)
  }

  const onClose = () => setOpenBlockId(-1)

  return (
    <>
      <FactoryBlock block={block}></FactoryBlock>

      {openBlockId === index ? (
        <ParamsDialog field={block} path={`${path}.params`} onSave={onSave} onClose={onClose}>
          <Params
            component={block}
            config={config.find(c => c.type === block.type)}
            configType='BLOCK'
            path={`${path}[${index}]`}
          />

          <ResponsiveParams responsive={block.responsive} path={`${path}[${index}].responsive`} />
          <AnimationParams animation={block.animation} path={`${path}[${index}].animation`} />
        </ParamsDialog>
      ) : null}
    </>
  )
}

export default BlockEditor
