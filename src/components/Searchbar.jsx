import React, { useState } from 'react';

function Searchbar({ feeds, setFilteredFeeds, onSearchChange }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value); // Call the onSearchChange prop with the updated search value
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchFeed = searchValue.toLowerCase().trim();

    const filteredFeeds = feeds.filter((feed) => feed.text.toLowerCase().includes(searchFeed));

    setFilteredFeeds(filteredFeeds);
    setSearchValue('');
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
