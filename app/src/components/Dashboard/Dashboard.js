import React from 'react'
import PropTypes from 'prop-types'
import logo from './images/horizontal_large.png'

import Panel from './components/Panel'
import Info from './components/InfoContainer'
import { Tabs, Tab } from 'material-ui/Tabs'

import InfoIcon from 'material-ui/svg-icons/action/assessment'
import LogIcon from 'material-ui/svg-icons/action/dashboard'

const banner = {
  'background': 'linear-gradient(-45deg, rgb(10,25,42) 0%,rgb(19,54,81) 100%)',
  'textAlign': 'center',
  'color': 'white',
  'fontSize': '28px',
  'padding': '32px'
}

const layout = {
  'backgroundColor': 'rgb(40,40,40)',
  'display': 'flex',
  'flexDirection': 'row',
  'flexWrap': 'wrap',
  'justifyContent': 'center'
}

class DashboardComponent extends React.Component {
  static propTypes = {
    loadContainersInfo: PropTypes.func.isRequired,
    containers: PropTypes.array.isRequired
  }

  componentDidMount() {
    // refresh logs
    const update = () => {
      this.props.loadContainersInfo()
      window.setTimeout(update, 6000)
    }

    update()
  }

  makePanel() {
    return this.props.containers.map((c, index) => {
      return (
        <Panel key={index} containerInfo={c} />
      )
    })
  }

  render() {
    return (
      <div>
        <div style={banner}>
          <img src={logo} alt='' />
          <div>Docker Dev Dash</div>
          <div style={{ fontSize: '18px', color: 'rgb(128,128,128)' }}>Docker 1.8+ only</div>
        </div>

        <Tabs>

          <Tab
            icon={<InfoIcon />}
            label='INFO'
          >
            <Info info={this.props.info} />
          </Tab>

          <Tab
            icon={<LogIcon />}
            label='LOGS'
          >
            <div style={layout}>
              {this.makePanel()}
            </div>
          </Tab>

        </Tabs>

      </div >
    )
  }
}

export default DashboardComponent
