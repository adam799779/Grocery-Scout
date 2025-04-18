import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const GroceryScout = () => {
  const [products] = useState([
    { name: 'Eggplant' },
    { name: 'Energy Drink' },
    { name: 'English Muffins' },
    { name: 'Eggs' },
    { name: 'Elbow Macaroni' },
    { name: 'Espresso Beans' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [outOfStockItem, setOutOfStockItem] = useState(null);

  const fetchEggsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/test'); // Adjust the API URL if needed
      console.log('API response:', response.data); // Debugging: log the API response to see what we get
      setApiData(response.data); // Expect response to contain both name and price
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === 'eggs') {
      fetchEggsData();
      setFilteredProducts([]); // Clear non-egg products when searching for eggs
      setOutOfStockItem(null);  // Reset out-of-stock item state
    } else if (query) {
      const filtered = products
        .filter((product) => product.name.toLowerCase().startsWith(query))
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredProducts(filtered);
      setApiData(null); // Clear the API data when searching for non-eggs
      setOutOfStockItem(null);
    } else {
      setFilteredProducts([]);
      setApiData(null);
      setOutOfStockItem(null);
    }
  };

  const handleItemClick = (item) => {
    setSearchQuery(item); // Set clicked item to search bar
    if (item.toLowerCase() === 'eggs') {
      fetchEggsData();
      setFilteredProducts([]); // Clear filtered products when clicking on eggs
    } else {
      setOutOfStockItem(item);
      setFilteredProducts([]); // Clear filtered products when item is out of stock
    }
  };

  const handleSearchReset = () => {
    setSearchQuery('');
    setFilteredProducts([]);
    setApiData(null);
    setOutOfStockItem(null);
  };

  const handleSearchClick = () => {
    if (searchQuery === 'eggs') {
      fetchEggsData();
    } else {
      const filtered = products
        .filter((product) => product.name.toLowerCase().startsWith(searchQuery))
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredProducts(filtered);
      setApiData(null);
    }
  };

  return (
    <div className="container">
      <h1>
        <span className="grocery-scout">Grocery Scout 🛒</span>
        <br />
        <span className="subheading">Discover the best deals and compare top grocery prices! 🏷️🔍</span>
        <br />
        <span className="subheading">Shop smarter with us—find fresh, quality groceries at unbeatable prices! 🥕🍞🥖</span>
      </h1>
      <input
        type="text"
        placeholder="Search for groceries..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div>
        <button onClick={handleSearchClick}>Search</button>
        <button className="clear-btn" onClick={handleSearchReset}>
          Clear Search 🔄
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {apiData && apiData.length > 0 && (
        <div>
          <h2>Eggs Data:</h2>
          <ul>
            {apiData.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span> - <span className="price">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {outOfStockItem && (
        <div className="mt-4 p-4 bg-yellow-200 text-center rounded-md">
          <p><strong>{outOfStockItem}</strong> is currently out of stock.</p>
        </div>
      )}
      {filteredProducts.length > 0 && (
        <ul className="mt-4">
          {filteredProducts.map((product, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(product.name)}
              className="border p-3 rounded-md shadow-sm hover:bg-gray-200"
            >
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}
      {searchQuery && filteredProducts.length === 0 && !apiData && !outOfStockItem && (
        <p className="text-gray-500">No products found matching "{searchQuery}"</p>
      )}
    </div>
  );
};

export default GroceryScout;
