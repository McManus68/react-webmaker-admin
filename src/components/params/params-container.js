import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledParamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-right: 0.4rem;
`

const ParamsContainer = ({ label, children }) => {
  return (
    <StyledParamsContainer>
      <label>{label}</label>
      {children}
    </StyledParamsContainer>
  )
}

export default ParamsContainer

ParamsContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
}
