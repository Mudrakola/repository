import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachItem
  return (
    <li className="repo-item">
      <img src={avatarUrl} className="avatar-img" alt={name} />
      <h1 className="repo-name">{name}</h1>
      <div className="image-stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="star-img"
          alt="stars"
        />
        <p className="paragraph">{starsCount} starts</p>
      </div>
      <div className="image-stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="star-img"
          alt="forks"
        />
        <p className="paragraph">{forksCount} forks</p>
      </div>
      <div className="image-stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="star-img"
          alt="open issues"
        />
        <p className="paragraph">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
