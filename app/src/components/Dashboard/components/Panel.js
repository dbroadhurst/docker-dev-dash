import React from 'react'
import PropTypes from 'prop-types'

const panel = {
  'margin': '16px'
}

const log = {
  'width': '480px',
  'height': '320px',
  'overflow': 'scroll',
  'backgroundColor': 'rgb(0,0,0)',
  'color': 'rgb(255,255,255)',
  'margin': '0'
}

const info = {
  'width': '480px',
  'color': 'rgb(255,255,255)',
  'padding': '4px 0'
}

class PanelComponent extends React.Component {
  static propTypes = {
    containerInfo: PropTypes.object.isRequired
  }

  render() {
    let c = this.props.containerInfo
    let infoStyle
    if (c.status.includes('Exit')) {
      infoStyle = Object.assign({}, info, { 'backgroundColor': 'rgb(128,0,0)' })
    } else {
      infoStyle = Object.assign({}, info, { 'backgroundColor': 'rgb(0,128,0)' })
    }
    return (
      <div key={c.id} style={panel}>
        <pre style={log}>{c.log}</pre>
        <div style={infoStyle}>id: {c.id}</div>
        <div style={infoStyle}>status: {c.status}</div>
        <div style={infoStyle}>name: {c.name}</div>
      </div>
    )
  }
}

export default PanelComponent
