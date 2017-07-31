import React from 'react'
import PropTypes from 'prop-types'

import JsonToReact from 'json-to-react'

const infoBody = {
  margin: '0px',
  padding: '16px',
  backgroundColor: 'rgb(0,0,0)',
  color: 'rgb(255,255,255)'
}

class InfoComponent extends React.Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    loadDockerInfo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.props.loadDockerInfo()
  }

  render() {
    return (
      <pre style={infoBody}>
        <JsonToReact
          json={this.props.info}
        />
      </pre>
    )
  }
}

export default InfoComponent
