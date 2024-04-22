export const Filters = ({ data, setFilters, filters }) => {
  // TODO: fix filters options
  const extractOptions = (key) => {
    const options = new Set(data.characters.results.map((character) => character[key]))
    return [...options]
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const resetFilters = () => {
    setFilters({ status: '', species: '', gender: '' })
  }

  return (
    <form className='filters-form'>

      <div className='select-container'>
        <select name='status' defaultValue='' onChange={handleFilterChange}>
          <option value='' disabled selected>Status...</option>
          {
            extractOptions('status').map((status) => {
              return (
                <option key={status} value={status}>{status}</option>
              )
            })
          }
        </select>
      </div>

      <div className='select-container'>
        <select name='species' onChange={handleFilterChange} defaultValue=''>
          <option value='' disabled selected>Especie...</option>
          {
            extractOptions('species').map((species) => {
              return (
                <option key={species} value={species}>{species}</option>
              )
            })
          }
        </select>
      </div>

      <div className='select-container'>
        <select name='gender' onChange={handleFilterChange} defaultValue=''>
          <option value='' disabled selected>Genero</option>
          {
            extractOptions('gender').map((gender) => {
              return (
                <option key={gender} value={gender}>{gender}</option>
              )
            })
          }
        </select>
      </div>

      <button
        type='reset'
        onClick={resetFilters}
        className='reset-btn'
      > Reset filters
      </button>
    </form>
  )
}
