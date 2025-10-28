import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')  // your backend URL
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>E-Commerce Products</h1>
      {products.length === 0 && <p>No products found.</p>}
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Price: ₹{p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
