import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    languagePreferred: languageFiltersData[0].id,
    popularRepositories: [],
    isSelected: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getLanguage()
  }

  getLanguage = async () => {
    this.setState({isSelected: true})
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {languagePreferred} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${languagePreferred}`

    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        popularRepositories: updatedData,
        isSelected: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('no')
    }
  }

  onChangeRepo = eachId => {
    this.setState({languagePreferred: eachId}, this.getLanguage)
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositoriesList = () => {
    const {popularRepositories} = this.state

    return (
      <ul className="repository-list-container">
        {popularRepositories.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-heading">Something Went Wrong</p>
    </div>
  )

  renderReposi = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {isSelected, languagePreferred} = this.state
    console.log(languagePreferred)
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular </h1>
        <ul className="list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguage={eachLanguage}
              key={eachLanguage.id}
              isSelect={eachLanguage.id === languagePreferred}
              onChangeRepo={this.onChangeRepo}
            />
          ))}
        </ul>
        {isSelected ? this.renderLoader() : this.renderReposi()}
      </div>
    )
  }
}

export default GithubPopularRepos
