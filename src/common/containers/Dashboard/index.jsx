import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import DashboardComponent from './components'
import {GET_STATISTICS} from 'actions/dashboard'

class Dashboard extends Component {
  static propTypes = {
    statistics: PropTypes.array,
    getStatistics: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.getStatistics()
  }

  render () {
    const {statistics} = this.props
    const props = {statistics}

    return <DashboardComponent {...props} />
  }
}

function mapStateToProps (state) {
  return {statistics: state.dashboard.statistics}
}

function mapDispatchToProps (dispatch) {
  return {
    getStatistics: async () => {
      const result = await dispatch(GET_STATISTICS)
      dispatch(result)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
