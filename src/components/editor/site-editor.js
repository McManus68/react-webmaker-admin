import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'

import {
  updateSite,
  saveActiveTabRequest,
  setActiveIndex,
  setPendingAction,
} from '../../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import PageEditor from './page-editor'
import FooterEditor from './footer-editor'
import SiteEditorMenu from '../menus/site-editor-menu'
import LibraryMenu from '../menus/library-menu'

import { schema } from '../../utils/schema-site.js'

import './site-editor.scss'

const SiteEditor = ({ site }) => {
  // The validation schema
  const methods = useForm({
    validationSchema: schema,
    defaultValues: { ...site, pages: null, footer: null },
  })
  // Pending actions
  const pendingAction = useSelector(state => state.editor.pendingAction)
  // Store the current tab index
  const activeIndex = useSelector(state => state.editor.activeIndex)
  // When we request a page change, we ask to the page to save it's data before we proceed
  const [newTabIndex, setNewTabIndex] = useState(-1)
  // Is new Site on the Editor
  const currentSiteId = useSelector(state => state.editor.currentSiteId)
  // Listen the page saved event, after that we chan really change page
  const flagSaved = useSelector(state => state.editor.flagSaved)
  // If the site changes, we reset the form with the new site
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPendingAction(''))
    setNewTabIndex(-1)
    methods.reset(site)
  }, [currentSiteId])

  useEffect(() => {
    if (flagSaved) {
      switch (pendingAction) {
        case 'SWITCH-TAB':
          dispatch(setActiveIndex(newTabIndex))
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
  const onSwitchTabRequest = (e, value) => {
    dispatch(setPendingAction('SWITCH-TAB'))
    setNewTabIndex(value)
    dispatch(saveActiveTabRequest(activeIndex))
  }

  // Save the entire site
  const onUpdateSite = siteMetadata => {
    dispatch(updateSite({ ...site, ...siteMetadata }))
  }
  return (
    <div className='site-editor'>
      <div className='site-editor-content'>
        <AppBar position='static'>
          <Tabs value={activeIndex} onChange={onSwitchTabRequest}>
            {site &&
              site.pages.map((page, i) => <Tab key={i} label={page.title} />)}
            <Tab label='Footer' />
          </Tabs>
        </AppBar>

        {site &&
          site.pages.map((page, i) => (
            <PageEditor
              page={page}
              key={i}
              activeIndex={activeIndex}
              index={i}
            />
          ))}
        <FooterEditor
          footer={site.footer}
          activeIndex={activeIndex}
          index={site.pages.length}
        />
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
