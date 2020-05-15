import React, { useState } from 'react'
import PropTypes from 'prop-types'

import PageParams from './page-params'
import ResponsiveParams from './responsive-params'
import AnimationParams from './animation-params'
import Params from './params'

import './page-editor.scss'

function PageEditor({ page, currentPage, pageIndex }) {
  return (
    currentPage === pageIndex && (
      <div className='page-editor-container container'>
        <PageParams page={page} path={`pages[${pageIndex}]`} />

        {page.sections &&
          page.sections.map((section, sectionIndex) => (
            <div className='page-editor-section-container' key={sectionIndex}>
              <h2>{section.type}</h2>

              <div className='page-editor-section-content'>
                <Params
                  component={section}
                  configType='SECTION'
                  path={`pages[${pageIndex}].sections[${sectionIndex}]`}
                />

                {section.rows &&
                  section.rows.map((row, rowIndex) => (
                    <div className='page-editor-row-container' key={rowIndex}>
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
                                path={`pages[${pageIndex}].sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}]`}
                              />

                              <ResponsiveParams
                                responsive={block.responsive}
                                path={`pages[${pageIndex}].sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}].responsive`}
                              />
                              <AnimationParams
                                animation={block.animation}
                                path={`pages[${pageIndex}].sections[${sectionIndex}].rows[${rowIndex}].blocks[${blockIndex}].animation`}
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
    )
  )
}

export default PageEditor

PageEditor.propTypes = {
  children: PropTypes.node,
  currentPage: PropTypes.any.isRequired,
}
