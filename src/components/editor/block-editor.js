import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlock, saveParams } from '../../redux'
import ResponsiveParams from '../params/responsive-params'
import AnimationParams from '../params/animation-params'
import Params from '../params/params'
import { Remove, Settings } from './controls'
import FactoryBlock from '@bit/mcmanus68.webmaker.factory.factory-block'
import ParamsDialog from '../params/params-dialog'
import EditorControls from './editor-controls'
import styled from 'styled-components'

const BlockEditor = ({ path, block, index }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const config = useSelector(state => state.config.block)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(saveParams(`${path}[${index}]`, data))

  return (
    <>
      <FactoryBlock block={block}>
        <Remove type='block' onClick={() => dispatch(removeBlock(path, index))} />
        <Settings type='block' onClick={() => setOpen(!open)} />
      </FactoryBlock>

      <ParamsDialog open={open} defaultValues={block} onClose={onClose} onSave={onSave}>
        <Params path='params' component={block} type='block' />
        <ResponsiveParams path='responsive' responsive={block.responsive} />
        <AnimationParams path='animation' animation={block.animation} />
      </ParamsDialog>
    </>
  )
}

export default BlockEditor
