import { connect } from 'react-redux'
import {
  loadDockerInfo
} from '../../../reducers/dashboard'
import Info from './Info'

const mapStatetoProps = (state) => {
  return {
    info: state.dashboard.info
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadDockerInfo: () => {
      dispatch(loadDockerInfo())
    }
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Info)
