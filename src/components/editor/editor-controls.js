import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import BlockEditor from './block-editor'
import { FaPlusCircle, FaTrashAlt, FaToolbox } from 'react-icons/fa'
import { AddBefore, AddAfter, Remove, Prepend, Settings, GenericEditor } from './controls'
import FactoryRow from '@bit/mcmanus68.webmaker.factory.factory-row'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  position: absolute;
  visiblity: hidden;
  top: 0;
  right: 0;
  color: ${props => props.theme.color[props.type]};

  svg {
    margin: 0 0.2rem;
    cursor: pointer;
  }
`

const EditorControls = ({ type, field, index, remove, insert, newObj, settings }) => {
  return (
    <ControlsContainer type={type}>
      <FaPlusCircle type={type} onClick={() => insert(index, newObj())} />
      <FaToolbox type={type} onClick={() => settings(field.id)} />
      <FaTrashAlt type={type} onClick={() => remove(index)} />
      <FaPlusCircle type={type} onClick={() => insert(index + 1, newObj())} />
    </ControlsContainer>
  )
}

export default EditorControls
