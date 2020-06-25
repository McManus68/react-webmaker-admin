import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DnDTypes } from '../../types/types'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

const Component = styled.li`
  border: 1px dashed ${props => props.theme.color[props.type]};
  margin: 0.3rem 0;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  list-style: none;
  height: 40px;
  cursor: pointer;
  padding: 0.4rem;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`

const DraggableItem = ({ type, component }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: type, componentType: component.type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <Component isDragging={isDragging} ref={drag} type={component.type}>
      {component.type}
    </Component>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 1.4rem 0;
`

const ComponentsMenu = () => {
  const sections = useSelector(state => state.config.section)
  const blocks = useSelector(state => state.config.block)

  return (
    <div>
      <h4>Sections</h4>
      <List>
        {sections.map((section, i) => (
          <DraggableItem key={i} component={section} type={DnDTypes.SECTION} />
        ))}
      </List>

      <h4>Blocks</h4>
      <List>
        {blocks.map((block, i) => (
          <DraggableItem key={i} component={block} type={DnDTypes.BLOCK} />
        ))}
      </List>
    </div>
  )
}

export default ComponentsMenu
