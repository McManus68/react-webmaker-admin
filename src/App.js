import React from 'react'
import './App.scss'

import Header from './components/header'
import Menu from './components/menu'
import Editor from './components/editor'

function App() {
  return (
    <div className='App'>
      <Header />

      <main className='main'>
        <Menu />
        <Editor />
      </main>

      <footer>
        <div className='container'></div>
      </footer>
    </div>
  )
}

export default App
