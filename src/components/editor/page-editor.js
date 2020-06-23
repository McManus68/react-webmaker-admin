import React from 'react'
import { Container } from '../../styles/mixin'
import { useSelector, useDispatch } from 'react-redux'
import { addSection } from '../../redux'
import SectionEditor from './section-editor'
import styled from 'styled-components'

const StyledPageEditor = styled.div`
  display: flex;
  flex-direction: column;
`
const PageEditor = ({ page, path, activeIndex, index }) => {
  const dispatch = useDispatch()

  return (
    activeIndex === index && (
      <Container>
        <StyledPageEditor>
          {page.sections &&
            page.sections.map((section, i) => (
              <SectionEditor key={i} index={i} section={section} path={`${path}.sections`} />
            ))}
        </StyledPageEditor>
      </Container>
    )
  )
}

export default PageEditor
