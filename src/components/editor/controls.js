import React from 'react'
import { FaPlusCircle, FaTrashAlt, FaToolbox } from 'react-icons/fa'
import styled from 'styled-components'

export const GenericEditor = styled.div`
  position: relative;
  border: 2px solid ${props => props.theme.color[props.type]};
  min-height: 100px;
  background-color: ${({ canDrop, isOver }) =>
    isOver && !canDrop
      ? 'red'
      : !isOver && canDrop
      ? 'yellow'
      : isOver && canDrop
      ? 'green'
      : 'inherit'};
`
const Control = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 2px;
  z-index: 99;
  background-color: #fff;
  border-radius: 50%;
  color: ${props => props.theme.color[props.type]};
  visibility: hidden;
  transition: 0.3s;
  ${GenericEditor}:hover & {
    visibility: visible;
  }
`
const StyledPrepend = styled.div`
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  color: ${props => props.theme.color[props.type]};
  padding: 2px;
  background-color: #fff;
`
const StyledAddBefore = styled(Control)`
  position: absolute;
  left: 50%;
  top: -12px;
`
const StyledAddAfter = styled(Control)`
  position: absolute;
  left: 50%;
  bottom: -14px;
`
const StyledRemove = styled(Control)`
  position: absolute;
  right: -12px;
  top: 50%;
`
const StyledSettings = styled(Control)`
  position: absolute;
  left: -12px;
  top: -12px;
`

export const AddBefore = ({ type, onClick }) => {
  return (
    <StyledAddBefore type={type}>
      <FaPlusCircle onClick={onClick} />
    </StyledAddBefore>
  )
}

export const AddAfter = ({ type, onClick }) => {
  return (
    <StyledAddAfter type={type}>
      <FaPlusCircle onClick={onClick} />
    </StyledAddAfter>
  )
}

export const Remove = ({ type, onClick }) => {
  return (
    <StyledRemove type={type}>
      <FaTrashAlt onClick={onClick} />
    </StyledRemove>
  )
}

export const Prepend = ({ type, onClick }) => {
  return (
    <StyledPrepend type={type}>
      <FaPlusCircle onClick={onClick} />
    </StyledPrepend>
  )
}

export const Settings = ({ type, onClick }) => {
  return (
    <StyledSettings type={type}>
      <FaToolbox onClick={onClick} />
    </StyledSettings>
  )
}
