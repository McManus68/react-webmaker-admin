import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { fetchConfigSection, fetchConfigBlock, fetchSites } from './redux'
import Header from './components/header'
import Menu from './components/menu'
import SiteEditor from './components/editor/site-editor'

import './App.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchConfigSection())
    dispatch(fetchConfigBlock())
    dispatch(fetchSites())
  }, [])

  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <Menu />
        <SiteEditor />
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
