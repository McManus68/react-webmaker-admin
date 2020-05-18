import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig, fetchSites, setEditingSite } from './redux'
import Header from './components/header'
import Menu from './components/menu'
import SiteEditor from './components/site-editor'

import './App.scss'

function App() {
  const dispatch = useDispatch()

  const site = useSelector(state => state.site.site)

  useEffect(() => {
    dispatch(fetchConfig())
    dispatch(fetchSites())
  }, [])

  useEffect(() => {
    dispatch(setEditingSite(site))
    console.log('setEditingSite')
  }, [site])

  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <Menu />
        {site ? <SiteEditor site={site} /> : null}
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
