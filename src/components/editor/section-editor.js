import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSection, setSection, removeSection, saveParams } from '../../redux'
import Params from '../params/params'
import RowEditor from './row-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor, Settings } from './controls'
import FactorySection from '@bit/mcmanus68.webmaker.factory.factory-section'
import ParamsDialog from '../params/params-dialog'
import { ItemTypes } from '../../types/types'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

const SectionEditor = ({ section, path, index }) => {
  const config = useSelector(state => state.config.section)
  const defaultSection = useSelector(state => state.config.default.section)
  const isStandAlone = section => config.find(item => item.type === section.type).standalone
  const dispatch = useDispatch()

  const getDefaultParams = type => {
    return config
      .find(item => item.type === type)
      .params.map(item => ({
        name: item.name,
        type: item.type,
        value: item.defaultValue,
      }))
  }

  const newSection = type => ({
    type: type,
    rows: [],
    params: getDefaultParams(type),
  })

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(saveParams(`${path}[${index}].params`, data.params))

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.SECTION,
    canDrop: () => section.type === undefined,
    drop: () => dispatch(setSection(path, index, newSection('SECTION_HERO'))),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })

  return (
    <>
      <GenericEditor type='section' ref={drop} canDrop={canDrop} isOver={isOver}>
        <FactorySection section={section} recursive={false} />

        {section.rows &&
          section.rows.map((row, i) => (
            <RowEditor key={i} index={i} row={row} path={`${path}[${index}].rows`} scope='PAGE' />
          ))}

        <AddBefore type='section' onClick={() => dispatch(addSection(path, index))} />
        <Remove type='section' onClick={() => dispatch(removeSection(path, index))} />
        <AddAfter type='section' onClick={() => dispatch(addSection(path, index + 1))} />
        <Settings type='section' onClick={() => setOpen(!open)} />

        {section.type && isStandAlone(section) ? (
          <ParamsDialog open={open} defaultValues={section} onClose={onClose} onSave={onSave}>
            <Params component={section} config={config.find(c => c.type === section.type)} />
          </ParamsDialog>
        ) : null}
      </GenericEditor>
    </>
  )
}

export default SectionEditor
