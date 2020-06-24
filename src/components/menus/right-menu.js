import React from 'react'
import LibraryMenu from './library-menu'
import PageMenu from './page-menu'
import SiteMenu from './site-menu'
import ExpansionPanel from '../ui/expansion-panel'
import styled from 'styled-components'

const StyledRightMenu = styled.div`
  background-color: ${props => props.theme.color.bg};
  padding: 1rem;
  position: fixed;
  overflow-x: hidden;
  top: 60px;
  height: 100%;
  width: 300px;
`

const RightMenu = () => {
  return (
    <aside>
      <StyledRightMenu>
        <ExpansionPanel title='Site'>
          <SiteMenu />
        </ExpansionPanel>
        <ExpansionPanel title='Page'>
          <PageMenu />
        </ExpansionPanel>
        <ExpansionPanel title='Library'>
          <LibraryMenu />
        </ExpansionPanel>
      </StyledRightMenu>
    </aside>
  )
}

export default RightMenu
