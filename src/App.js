import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchConfig, fetchSites } from './redux'
import Header from './components/header'
import SitesMenu from './components/menus/sites-menu'
import SiteEditor from './components/editor/site-editor'

import './App.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConfig())
    dispatch(fetchSites())
  }, [])

  const site = useSelector(state => state.editor.site)
  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <SitesMenu />
        {site && <SiteEditor site={site} />}
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
