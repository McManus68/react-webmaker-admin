import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'

import { saveSite, addPage, saveCurrentPageRequest } from '../../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import PageEditor from './page-editor'
import SiteParams from '../params/site-params'

import { schema } from '../../utils/schema-site.js'

import './site-editor.scss'

const SiteEditor = () => {
  // The validation schema
  const methods = useForm({
    validationSchema: schema,
  })
  // Store the current page index
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  // When we request a page change, we ask to the page to save it's data before we proceed
  const [newPageIndex, setNewPageIndex] = useState(-1)
  // Currently editing site
  const site = useSelector(state => state.editor.site)
  // Listen the page saved event, after that we chan really change page
  const isCurrentPageSaved = useSelector(
    state => state.editor.isCurrentPageSaved
  )

  useEffect(() => {
    methods.reset(site)
    setCurrentPageIndex(0)
  }, [site])

  useEffect(() => {
    if (isCurrentPageSaved) setCurrentPageIndex(newPageIndex)
  }, [isCurrentPageSaved])

  // If the site changes, we reset the form with the new site
  const dispatch = useDispatch()

  // Page change request
  const onChangePageRequest = (e, value) => {
    setNewPageIndex(value)
    dispatch(saveCurrentPageRequest(currentPageIndex))
  }

  // Save the entire site
  const onSaveSite = siteMetadata => {
    dispatch(saveSite({ ...site, ...siteMetadata }))
  }

  return (
    <div className='editor-container'>
      <div className='editor-container-content'>
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

      <div className='editor-right-menu'>
        <FormContext {...methods}>
          <form onSubmit={methods.handleSubmit(onSaveSite)}>
            {site && (
              <div className='editor-right-menu-content'>
                <div className='button-container'>
                  <SiteParams site={site} />
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
                    type='submit'
                    onClick={saveSite}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </form>
        </FormContext>
      </div>
    </div>
  )
}

export default SiteEditor
