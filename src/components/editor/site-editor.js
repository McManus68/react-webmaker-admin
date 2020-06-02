import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'

import {
  updateSite,
  saveCurrentPageRequest,
  setCurrentPageIndex,
  setPendingAction,
} from '../../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PageEditor from './page-editor'
import SiteEditorMenu from '../menus/site-editor-menu'
import LibraryMenu from '../menus/library-menu'

import { schema } from '../../utils/schema-site.js'

import './site-editor.scss'

const SiteEditor = () => {
  // The validation schema
  const methods = useForm({
    validationSchema: schema,
  })
  // Pending actions
  const pendingAction = useSelector(state => state.editor.pendingAction)
  // Store the current page index
  const currentPageIndex = useSelector(state => state.editor.currentPageIndex)
  // When we request a page change, we ask to the page to save it's data before we proceed
  const [newPageIndex, setNewPageIndex] = useState(-1)
  // Currently editing site
  const site = useSelector(state => state.editor.site)
  // Is new Site on the Editor
  const currentSiteId = useSelector(state => state.editor.currentSiteId)
  // Listen the page saved event, after that we chan really change page
  const flagSaved = useSelector(state => state.editor.flagSaved)

  // If the site changes, we reset the form with the new site
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPendingAction(''))
    setNewPageIndex(-1)
    methods.reset(site)
  }, [currentSiteId])

  useEffect(() => {
    if (flagSaved) {
      switch (pendingAction) {
        case 'CHANGE-PAGE':
          dispatch(setCurrentPageIndex(newPageIndex))
          break
        case 'UPDATE-SITE':
          methods.handleSubmit(onUpdateSite)()
          break
        default:
          break
      }
    }
  }, [flagSaved])

  // Page change request
  const onChangePageRequest = (e, value) => {
    dispatch(setPendingAction('CHANGE-PAGE'))
    setNewPageIndex(value)
    dispatch(saveCurrentPageRequest(currentPageIndex))
  }

  // Save the entire site
  const onUpdateSite = siteMetadata => {
    dispatch(updateSite({ ...site, ...siteMetadata }))
  }
  return (
    <div className='site-editor'>
      <div className='site-editor-content'>
        <AppBar position='static'>
          <Tabs
            value={currentPageIndex}
            onChange={onChangePageRequest}
            aria-label='simple tabs example'
          >
            {site &&
              site.pages.map((page, i) => <Tab key={i} label={page.title} />)}
          </Tabs>
        </AppBar>

        {site &&
          site.pages.map((page, pageIndex) => (
            <PageEditor
              page={page}
              key={pageIndex}
              currentPage={currentPageIndex}
              pageIndex={pageIndex}
            />
          ))}
      </div>

      {site && (
        <FormContext {...methods}>
          <div className='site-editor-right-menu'>
            <SiteEditorMenu />
            <LibraryMenu />
          </div>
        </FormContext>
      )}
    </div>
  )
}

export default SiteEditor
