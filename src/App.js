import React, { useEffect } from 'react'
import { useForm, FormContext, useFormContext } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { fetchConfig, setEditorSite } from './redux'

import Header from './components/header'
import Menu from './components/menu'
import Editor from './components/editor'

import './App.scss'

function App() {
  const dispatch = useDispatch()

  const site = useSelector(state => state.site.site)

  useEffect(() => {
    dispatch(fetchConfig())
  }, [])

  useEffect(() => {
    dispatch(setEditorSite(site))
  }, [site])

  const methods = useForm()

  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <Menu />
        <FormContext {...methods}>
          {site ? <Editor site={site} /> : null}
        </FormContext>
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
