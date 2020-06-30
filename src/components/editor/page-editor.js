import React from 'react'
import { Container } from '../../styles/mixin'
import { useSelector, useDispatch } from 'react-redux'
import { addSection } from '../../redux'
import SectionEditor from './section-editor'
import { Prepend } from './controls'
import FactoryFooter from '@bit/mcmanus68.webmaker.factory.factory-footer'
import styled from 'styled-components'

const StyledPageEditor = styled.div`
  display: flex;
  flex-direction: column;
`
const PageEditor = ({ page, path, activeIndex, index }) => {
  const site = useSelector(state => state.editor.site)
  const dispatch = useDispatch()
  return (
    activeIndex === index && (
      <Container>
        {page.sections.length === 0 && (
          <Prepend type='section' onClick={() => dispatch(addSection(`${path}.sections`, 0))} />
        )}
        <StyledPageEditor>
          {page.sections.map((section, i) => (
            <SectionEditor key={i} index={i} section={section} path={`${path}.sections`} />
          ))}
        </StyledPageEditor>
        {page.sections.length > 0 && <FactoryFooter footer={site.footer} />}
      </Container>
    )
  )
}

export default PageEditor
