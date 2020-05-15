import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { saveEditorPage } from '../redux'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import PageEditor from './page-editor'
import SiteParams from './site-params'

import './editor.scss'

const Editor = ({ site }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const dispatch = useDispatch()

  const { register, handleSubmit, reset } = useFormContext({
    defaultValues: site,
  })

  const onChangeTab = (e, value) => {
    setCurrentPageIndex(value)
    handleSubmit(onSubmitPage)()
  }

  const onSubmitSite = data => {
    //dispatch(saveSite(site))
  }

  const onSubmitPage = data => {
    dispatch(saveEditorPage(data.pages[currentPageIndex], currentPageIndex))
  }

  return (
    <div className='editor-container'>
      <form onSubmit={handleSubmit(onSubmitSite)}>
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
              register={register}
            />
          ))}
          <div className='editor-right-menu'>
            {site.pages.length > 0 && (
              <div className='editor-right-menu-content'>
                <SiteParams site={site} register={register} />
                <div className='button-container'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => reset(site)}
                  >
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
      </form>
    </div>
  )
}

export default Editor
