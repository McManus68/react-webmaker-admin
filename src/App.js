import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig, fetchSites, setEditorSite } from './redux'
import Header from './components/header'
import Menu from './components/menu'
import Editor from './components/editor'

import './App.scss'

function App() {
  const dispatch = useDispatch()

  const site = useSelector(state => state.site.site)

  useEffect(() => {
    dispatch(fetchConfig())
    dispatch(fetchSites())
  }, [])

  useEffect(() => {
    dispatch(setEditorSite(site))
    console.log('setEditorSite')
  }, [site])

  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <Menu />
        {site ? <Editor site={site} /> : null}
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
