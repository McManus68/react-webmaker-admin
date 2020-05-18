import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'

import { saveSite } from '../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import PageEditor from './page-editor'
import SiteParams from './site-params'

import { schema } from '../utils/schema-site.js'

import './editor.scss'

const Editor = ({ site }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const editedSite = useSelector(state => state.editor.site)

  const methods = useForm({
    validationSchema: schema,
  })

  useEffect(() => {
    methods.reset(site)
    console.log('new site ', site)
  }, [site])

  const dispatch = useDispatch()

  const onChangeTab = (e, value) => {
    setCurrentPageIndex(value)
  }

  const onSaveSite = siteMetadata => {
    dispatch(saveSite({ ...editedSite, ...siteMetadata }))
  }

  return (
    <div className='editor-container'>
      <div className='editor-container-content'>
        <AppBar position='static'>
          <Tabs
            value={currentPageIndex}
            onChange={onChangeTab}
            aria-label='simple tabs example'
          >
            {site.pages.map((page, i) => (
              <Tab key={i} label={page.title} />
            ))}
          </Tabs>
        </AppBar>

        {site.pages.map((page, pageIndex) => (
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
            {site.pages.length > 0 && (
              <div className='editor-right-menu-content'>
                <div className='button-container'>
                  <SiteParams site={site} />
                  <Button variant='contained' color='primary'>
                    Cancel
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

export default Editor
