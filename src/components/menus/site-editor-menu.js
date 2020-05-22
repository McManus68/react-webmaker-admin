import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPage, saveCurrentPageRequest, setPendingAction } from '../../redux'

import Button from '@material-ui/core/Button'

import SiteParams from '../params/site-params'

import './site-editor-menu.scss'

const SiteEditorMenu = methods => {
  const site = useSelector(state => state.editor.site)
  const currentPageIndex = useSelector(state => state.editor.currentPageIndex)

  const dispatch = useDispatch()

  // Request for saving the entire - First we save the current page
  const onUpdateSiteRequest = () => {
    dispatch(setPendingAction('UPDATE-SITE'))
    dispatch(saveCurrentPageRequest(currentPageIndex))
  }

  return (
    <div className='site-editor-menu'>
      <form>
        {site && (
          <div>
            <div className='site-editor-menu-header'>
              <h3>Site information</h3>
            </div>
            <div className='site-editor-menu-content'>
              <SiteParams site={site} />
              <div className='site-editor-menu-buttons'>
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
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SiteEditorMenu
