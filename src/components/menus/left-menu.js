import React from 'react'
import ExpansionPanel from '../ui/expansion-panel'
import SitesMenu from './sites-menu'
import ComponentsMenu from './components-menu'
import styled from 'styled-components'

const StyledLeftMenu = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  background-color: ${props => props.theme.color.bg};
  overflow-x: hidden;
  padding: 1rem;
  height: 100%;
  width: 250px;
`

const leftMenu = () => {
  return (
    <aside>
      <StyledLeftMenu>
        <ExpansionPanel title='Sites'>
          <SitesMenu />
        </ExpansionPanel>
        <ExpansionPanel title='Components'>
          <ComponentsMenu />
        </ExpansionPanel>
      </StyledLeftMenu>
    </aside>
  )
}

export default leftMenu
