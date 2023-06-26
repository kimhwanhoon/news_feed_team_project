import React, { useState } from 'react';

function Searchbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search functionality here
    console.log('Searching for:', searchValue);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input placeholder="Search" value={searchValue} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default Searchbar;
