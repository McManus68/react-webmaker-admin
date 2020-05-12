import React from 'react'
import { useSelector } from 'react-redux'

import './editor.scss'

const Editor = () => {
  const site = useSelector(state => state.site.site)

  console.log('SITE ', site)
  return (
    <div class='editor'>
      <ul>
        {site &&
          site.pages &&
          site.pages.map((page, id) => (
            <li key={id}>
              <span>{page.title}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Editor
