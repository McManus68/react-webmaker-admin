import styled from 'styled-components'

export const GenericEditor = styled.div`
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
export const Control = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 2px;
  background-color: #fff;
  color: ${props => props.color};
  visibility: hidden;
  transition: 0.3s;
  ${GenericEditor}:hover & {
    visibility: visible;
  }
`
export const AddBefore = styled(Control)`
  position: absolute;
  left: 50%;
  top: -12px;
`
export const AddAfter = styled(Control)`
  position: absolute;
  left: 50%;
  bottom: -14px;
`
export const Remove = styled(Control)`
  position: absolute;
  right: -12px;
  top: 50%;
`
export const Prepend = styled.div`
  cursor: pointer;
  text-align: center;
  color: ${props => props.color};
  padding: 2px;
  background-color: #fff;
`
