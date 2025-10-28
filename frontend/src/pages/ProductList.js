import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProducts = async (q='') => {
    const res = await API.get('/products', { params: { search: q, limit: 30 } });
    setProducts(res.data.products);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSearch} style={{marginBottom: 10}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." />
        <button type="submit" style={{marginLeft:6}}>Search</button>
      </form>

      <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12}}>
        {products.map(p => (
          <div key={p._id} style={{border:'1px solid #ddd', padding:10}}>
            <h3>{p.title}</h3>
            <p style={{minHeight:40}}>{p.description?.slice(0,80)}</p>
            <p>₹{p.price}</p>
            <Link to={`/product/${p._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
