import { connect } from 'react-redux'
import {
  loadContainersInfo,
  loadDockerInfo
} from '../../reducers/dashboard'
import Dashboard from './Dashboard'

const mapStatetoProps = (state) => {
  return {
    containers: state.dashboard.containers,
    info: state.dashboard.info
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadContainersInfo: () => {
      dispatch(loadContainersInfo())
    },
    loadDockerInfo: () => {
      dispatch(loadDockerInfo())
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Dashboard)
