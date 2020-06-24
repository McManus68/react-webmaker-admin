import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledParamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  margin-right: 0.4rem;
`

const Label = styled.label`
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  background-color: lightgrey;
  margin-bottom: 0.7rem;
  padding: 0.4rem;
`

const ParamsContainer = ({ label, children }) => {
  return (
    <StyledParamsContainer>
      <Label>{label}</Label>
      {children}
    </StyledParamsContainer>
  )
}

export default ParamsContainer

ParamsContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
}
