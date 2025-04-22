import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const GroceryScout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');





  
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/test`, {
        params: { searchTerm: query }
      });
      let sortedData = response.data.sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
      setApiData(sortedData);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
    setLoading(false);
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      fetchData(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setApiData(null);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    if (apiData) {
      const sorted = [...apiData].sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return e.target.value === 'asc' ? priceA - priceB : priceB - priceA;
      });
      setApiData(sorted);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="title">Grocery Scout 🛒</h1>
        <p className="tagline">Find the best grocery deals around you 🏷️🍅</p>
        <p className="description">
          Search for your favorite groceries and compare prices across stores instantly. 
          Whether you're meal prepping or just grabbing a few essentials, 
          Grocery Scout helps you save time and money.
        </p>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input"
          />
          <div className="button-group">
            <button className="search-btn" onClick={handleSearchClick}>🔍</button>
            <button className="clear-btn" onClick={handleSearchReset}>🗑️</button>
          </div>
        </div>

        {apiData && apiData.length > 0 && (
          <div className="sort-section">
            <label htmlFor="sort-select">Sort by Price:</label>
            <select id="sort-select" onChange={handleSortChange} value={sortOrder}>
              <option value="asc">Cheapest → Most Expensive</option>
              <option value="desc">Most Expensive → Cheapest</option>
            </select>
          </div>
        )}

        {loading && <p className="loading-text">Loading...</p>}

        {apiData && apiData.length > 0 && (
          <div>
            <h2 className="results-title">Search Results:</h2>
            <ul className="result-list">
              {apiData.map((item, index) => (
                <li key={index} className="result-item">
                  <a
                    href={`https://www.kroger.com/search?query=${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-name"
                  >
                    {item.name}
                  </a>
                  {/* Displaying price with a dollar sign */}
                  <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
                  {item.stock && (
                    <span
                      className={`item-stock ${item.stock.toLowerCase().includes("out") ? 'out-of-stock' : 'in-stock'}`}
                    >
                      ({item.stock})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {apiData && apiData.length === 0 && !loading && (
          <p className="no-results">No products found for "{searchQuery}"</p>
        )}
      </div>
    </div>
  );
};

export default GroceryScout;
