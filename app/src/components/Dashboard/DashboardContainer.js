import { connect } from 'react-redux'
import {
  loadContainersInfo
} from '../../reducers/dashboard'
import Dashboard from './Dashboard'

const mapStatetoProps = (state) => {
  return {
    containers: state.dashboard.containers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadContainersInfo: () => {
      dispatch(loadContainersInfo())
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Dashboard)
