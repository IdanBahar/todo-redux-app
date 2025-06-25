const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM
export function TodoFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  //   const filterBy = useSelector((state) => state.todosModule.filterBy)

  useEffect(() => {
    // Notify parent
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt, importance } = filterByToEdit
  return (
    <section className='todo-filter'>
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor='txt'>
          <input
            value={txt}
            onChange={handleChange}
            type='search'
            placeholder='By Txt'
            id='txt'
            name='txt'
          />
        </label>
        <label htmlFor='importance'>
          <input
            value={importance}
            onChange={handleChange}
            type='number'
            placeholder='By Importance'
            id='importance'
            name='importance'
          />
        </label>

        <button hidden>Set Filter</button>
        <label htmlFor='status'>
          <select
            id='status'
            name='status'
            value={filterByToEdit.status || 'all'}
            onChange={handleChange}
          >
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='done'>Done</option>
          </select>
        </label>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
      </form>
    </section>
  )
}
