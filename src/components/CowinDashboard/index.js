import './index.css'

import Loader from 'react-loader-spinner'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    covidData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.covidVaccinationDataApiUrl()
  }

  covidVaccinationDataApiUrl = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      this.setState({covidData: data, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {covidData} = this.state
    return (
      <>
        <VaccinationCoverage coverage={covidData.last_7_days_vaccination} />
        <VaccinationByGender genderBy={covidData.vaccination_by_gender} />
        <VaccinationByAge ageBy={covidData.vaccination_by_age} />
      </>
    )
  }

  lodingView = () => (
    <div className="loading" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-view-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="text">Something went wrong</h1>
    </div>
  )

  apiStatusView = () => {
    const {apiStatus} = this.state
    // console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.lodingView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <p className="para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          Co-WIN
        </p>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {this.apiStatusView()}
      </div>
    )
  }
}

export default CowinDashboard
