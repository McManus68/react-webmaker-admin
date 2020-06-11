import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPage, saveActiveTabRequest, setPendingAction } from '../../redux'
import Button from '@material-ui/core/Button'
import SiteParams from '../params/site-params'
import styled from 'styled-components'

const Menu = styled.div`
  padding: 1rem;
`
const MenuHeader = styled.div`
  background-color: ${props => props.theme.color.bg};
  display: flex;
  justify-content: center;
  height: 48px;
  align-items: center;
  box-sizing: border-box;
`
const MenuContent = styled.div`
  padding: 0.8rem;
`
const MenuControls = styled.div`
  text-align: center;
  margin: 1rem 0;
  button {
    margin-right: 0.3rem;
  }
`

const SiteEditorMenu = methods => {
  const site = useSelector(state => state.editor.site)
  const activeIndex = useSelector(state => state.editor.activeIndex)

  const dispatch = useDispatch()

  // Request for saving the entire - First we save the current page
  const onUpdateSiteRequest = () => {
    dispatch(setPendingAction('UPDATE-SITE'))
    dispatch(saveActiveTabRequest(activeIndex))
  }

  return (
    <Menu>
      <MenuHeader>
        <h3>Site information</h3>
      </MenuHeader>
      <MenuContent>
        <SiteParams site={site} />
        <MenuControls>
          <Button
            variant='contained'
            color='primary'
            onClick={() => dispatch(addPage('New Page'))}
          >
            Add Page
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={onUpdateSiteRequest}
          >
            Save
          </Button>
        </MenuControls>
      </MenuContent>
    </Menu>
  )
}

export default SiteEditorMenu
