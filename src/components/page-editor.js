import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormContext, useFormContext } from 'react-hook-form'

import PageParams from './page-params'
import ResponsiveParams from './responsive-params'
import AnimationParams from './animation-params'
import Params from './params'
import Button from '@material-ui/core/Button'

import { schema } from '../utils/schema-page.js'
import { saveEditorPage } from '../redux'

import './page-editor.scss'

function PageEditor({ page, currentPage, pageIndex }) {
  const methods = useForm({
    validationSchema: schema,
  })

  const dispatch = useDispatch()

  const savePage = data => {
    dispatch(saveEditorPage(data, pageIndex))
  }

  return (
    currentPage === pageIndex && (
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(savePage)}>
          <div className='page-editor-container container'>
            <Button variant='contained' type='submit'>
              Save
            </Button>
            <PageParams page={page} />

            {page.sections &&
              page.sections.map((section, sectionIndex) => (
                <div
                  className='page-editor-section-container'
                  key={sectionIndex}
                >
                  <h2>{section.type}</h2>

                  <div className='page-editor-section-content'>
                    <Params
                      component={section}
                      configType='SECTION'
                      path={`sections[${sectionIndex}]`}
                    />

                    {section.rows &&
                      section.rows.map((row, rowIndex) => (
                        <div
                          className='page-editor-row-container'
                          key={rowIndex}
                        >
                          <h3>ROW</h3>
                          {row.blocks &&
                            row.blocks.map((block, blockIndex) => (
                              <div
                                className='page-editor-block-container'
                                key={'block' + blockIndex}
                              >
                                <h4>{block.type}</h4>
                                <div className='page-editor-block-content'>
                                  <Params
                                    component={block}
                                    configType='BLOCK'
                                    path={`sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}]`}
                                  />

                                  <ResponsiveParams
                                    responsive={block.responsive}
                                    path={`sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}].responsive`}
                                  />
                                  <AnimationParams
                                    animation={block.animation}
                                    path={`sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}].animation`}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </form>
      </FormContext>
    )
  )
}

export default PageEditor

PageEditor.propTypes = {
  children: PropTypes.node,
  currentPage: PropTypes.any.isRequired,
}
