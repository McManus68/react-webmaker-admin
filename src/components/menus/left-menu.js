import React from 'react'
import ExpansionPanel from '../ui/expansion-panel'
import SitesMenu from './sites-menu'
import ComponentsMenu from './components-menu'
import styled from 'styled-components'

const StyledLeftMenu = styled.div`
  background-color: ${props => props.theme.color.bg};
  padding: 1rem;
  width: 300px;
`

const leftMenu = () => {
  return (
    <StyledLeftMenu>
      <ExpansionPanel title='Sites'>
        <SitesMenu />
      </ExpansionPanel>
      <ExpansionPanel title='Components'>
        <ComponentsMenu />
      </ExpansionPanel>
    </StyledLeftMenu>
  )
}

export default leftMenu
