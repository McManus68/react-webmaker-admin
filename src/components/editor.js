import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { setEditorPageIndex } from '../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import PageEditor from './page-editor'
import SiteParams from './site-params'

import './editor.scss'

const Editor = ({ site }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const onChangeTab = (e, value) => {
    setCurrentPageIndex(value)
  }

  return (
    <div className='editor-container'>
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

      <div className='editor-content'>
        {site.pages.map((page, pageIndex) => (
          <PageEditor
            page={page}
            key={pageIndex}
            currentPage={currentPageIndex}
            pageIndex={pageIndex}
          />
        ))}
        <div className='editor-right-menu'>
          {site.pages.length > 0 && (
            <div className='editor-right-menu-content'>
              <div className='button-container'>
                <Button variant='contained' color='primary'>
                  Cancel
                </Button>
                <Button variant='contained' color='secondary' type='submit'>
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Editor
