import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'

const StyledGenericEditor = styled.div`
  width: 100%;
`

const GenericEditorBlock = styled.div`
  position: relative;
  padding: 0.7rem 0;
  border: 3px solid ${props => props.color};
  padding: var(--container-padding);
  margin: 1.2rem 0;
  h2,
  h3,
  h4 {
    color: ${props => props.color};
    text-align: center;
  }
`
const Control = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 2px;
  background-color: #fff;
  color: ${props => props.color};
  visibility: hidden;
  transition: 0.3s;
  ${GenericEditorBlock}:hover & {
    visibility: visible;
  }
`
const AddBefore = styled(Control)`
  position: absolute;
  left: 50%;
  top: -12px;
`
const AddAfter = styled(Control)`
  position: absolute;
  left: 50%;
  bottom: -14px;
`
const Remove = styled(Control)`
  position: absolute;
  right: -12px;
  top: 50%;
`
const Prepend = styled.div`
  cursor: pointer;
  text-align: center;
  color: ${props => props.color};
  padding: 2px;
  background-color: #fff;
`

const GenericEditorContent = styled.div`
  display: flex;
  flex-direction: column;
`

const GenericEditorParams = styled.div`
  display: flex;
  flex-direction: row;
`

const GenericEditor = ({ path, getContent, type, newObj }) => {
  const { control } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })

  var color
  switch (type) {
    case 'SECTION':
      color = '#172a96'
      break
    case 'ROW':
      color = '#971c91'
      break
    case 'BLOCK':
      color = '#bd6716'
      break
  }

  return (
    <StyledGenericEditor>
      {!fields.length ? (
        <Prepend color={color}>
          <FaPlusCircle onClick={() => prepend(newObj())} />
        </Prepend>
      ) : null}

      {fields &&
        fields.map((field, i) => (
          <GenericEditorBlock key={field.id} color={color}>
            <AddBefore color={color}>
              <FaPlusCircle onClick={() => insert(i, newObj())} />
            </AddBefore>

            <GenericEditorContent>
              <h2>ddd</h2>
              <GenericEditorParams>{getContent(field, i)}</GenericEditorParams>
            </GenericEditorContent>

            <Remove color={color}>
              <FaTrashAlt onClick={() => remove(i)} />
            </Remove>
            <AddAfter color={color}>
              <FaPlusCircle onClick={() => insert(i + 1, newObj())} />
            </AddAfter>
          </GenericEditorBlock>
        ))}
    </StyledGenericEditor>
  )
}

export default GenericEditor
