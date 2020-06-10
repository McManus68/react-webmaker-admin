import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledParamsContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-right: 0.4rem;
`

const ParamsContainer = ({ label, children, row }) => {
  return (
    <StyledParamsContainer row={row}>
      <label>{label}</label>
      {children}
    </StyledParamsContainer>
  )
}

export default ParamsContainer

ParamsContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  row: PropTypes.bool,
}

ParamsContainer.defaultProps = {
  row: false,
}
