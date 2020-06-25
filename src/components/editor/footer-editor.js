import React from 'react'
import RowEditor from './row-editor'
import { Container } from '../../styles/mixin'

const FooterEditor = ({ footer, activeIndex, index }) => {
  return activeIndex === index && footer ? (
    <Container>
      {footer.rows &&
        footer.rows.map((row, i) => <RowEditor key={i} index={i} row={row} path='footer.rows' />)}
    </Container>
  ) : null
}

export default FooterEditor
