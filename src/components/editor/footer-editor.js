import React from 'react'
import RowEditor from './row-editor'
import { useDispatch } from 'react-redux'
import { addRow } from '../../redux'
import { Container } from '../../styles/mixin'
import { GenericEditor, Prepend } from './controls'
import FactoryFooter from '@bit/mcmanus68.webmaker.factory.factory-footer'

const FooterEditor = ({ footer, activeIndex, index }) => {
  const dispatch = useDispatch()
  return activeIndex === index && footer ? (
    <Container>
      <GenericEditor type='section'>
        <FactoryFooter footer={footer} recursive={false}>
          {footer.rows &&
            footer.rows.map((row, i) => (
              <RowEditor key={i} index={i} row={row} path='footer.rows' />
            ))}
        </FactoryFooter>
        {footer.rows.length === 0 && (
          <Prepend type='row' onClick={() => dispatch(addRow('footer.rows', 0))} />
        )}
      </GenericEditor>
    </Container>
  ) : null
}

export default FooterEditor
