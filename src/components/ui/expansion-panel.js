import React, { useState } from 'react'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanel = ({ title, children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <MuiExpansionPanel expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h3>{title}</h3>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </MuiExpansionPanel>
  )
}

export default ExpansionPanel
