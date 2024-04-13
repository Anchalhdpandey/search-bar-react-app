import React, { useState, useEffect } from 'react';
import "../App.css"
function SearchApp() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchTerm, products]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-app">
      <h1>Product Search App</h1>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="product-list">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.title} />
              <p className='title'>{product.title}</p>
              <p className='price'>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchApp;