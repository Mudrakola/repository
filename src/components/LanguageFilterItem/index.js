import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, isSelect, onChangeRepo} = props
  const {id, language} = eachLanguage
  const isButtonSelected = isSelect ? 'yes' : ''
  console.log(isSelect)
  const onButtonClick = () => {
    onChangeRepo(id)
  }
  return (
    <li>
      <button
        type="button"
        className={`button ${isButtonSelected}`}
        onClick={onButtonClick}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
