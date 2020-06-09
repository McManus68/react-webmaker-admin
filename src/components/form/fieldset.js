import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import styled from 'styled-components'

const StyledFieldSet = styled(FormControl)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 18.5px 14px;
  border-radius: 4px;
  margin-bottom: 1rem;
  box-sizing: border-box;
  legend {
    font-size: 12px;
  }
`

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
`

const FieldSet = ({ children, label, row }) => {
  return (
    <StyledFieldSet component='fieldset'>
      <FormLabel component='legend'>{label}</FormLabel>
      <FieldsContainer row={row}>{children}</FieldsContainer>
    </StyledFieldSet>
  )
}

export default FieldSet

FieldSet.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  row: PropTypes.bool,
}

FieldSet.defaultProps = {
  row: false,
}
