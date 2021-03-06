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
    if (c.Status.includes('Exit')) {
      infoStyle = Object.assign({}, info, { 'backgroundColor': 'rgb(128,0,0)', textAlign: 'center' })
    } else {
      infoStyle = Object.assign({}, info, { 'backgroundColor': 'rgb(0,128,0)', textAlign: 'center' })
    }
    return (
      <div key={c.id} style={panel}>
        <pre style={log}>{c.log}</pre>
        <div style={{ width: '480px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
          <div style={infoStyle}>image: {c.Image}</div>
          <div style={infoStyle}>id: {c.ID}</div>
        </div>
        {/* <div style={infoStyle}>status: {c.Status}</div> */}
      </div>
    )
  }
}

export default PanelComponent
