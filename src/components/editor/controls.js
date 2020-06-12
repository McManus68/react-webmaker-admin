import React from 'react'
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import styled from 'styled-components'

export const GenericEditor = styled.div`
  position: relative;
  padding: 0.7rem 0;
  border: 3px solid ${props => props.theme.color[props.type]};
  padding: ${props => props.theme.container.padding};
  margin: 1.2rem 0;
  h2,
  h3,
  h4 {
    color: ${props => props.theme.color[props.type]};
    text-align: center;
  }
`
const Control = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 2px;
  background-color: #fff;
  color: ${props => props.theme.color[props.type]};
  visibility: hidden;
  transition: 0.3s;
  ${GenericEditor}:hover & {
    visibility: visible;
  }
`
const StyledPrepend = styled.div`
  cursor: pointer;
  text-align: center;
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
