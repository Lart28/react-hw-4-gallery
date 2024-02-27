import { useState } from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';


export default function Searchbar({onSubmit, isSubmitting}) {
  const [query, setQuery] = useState('');

  const handleChangeQuery = e => {
    const SearchValue = e.currentTarget.value;
    setQuery(SearchValue);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') { 
      alert('Введіть пошуковий запит')
      return;
    }
    onSubmit(query.toLowerCase());
    setQuery('');
  }

    return (
      <header className='Searchbar'>
        <form className='SearchForm' onSubmit={handleSubmit}>
          <button type='submit' disabled={isSubmitting} className='SearchForm-button'>
            <span className='SearchForm-button-label'>Search</span>
          </button>
          <input
            name='search'
            className='SearchForm-input'
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
            onChange={handleChangeQuery}
            value={query}
          />
        </form>
      </header>
    )
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}