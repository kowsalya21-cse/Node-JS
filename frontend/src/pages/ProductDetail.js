import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import { CartContext } from '../context/CartContext';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addOrUpdateItem } = useContext(CartContext);

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    };
    load();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <div>
        <label>Qty: </label>
        <input type="number" min="1" value={qty} onChange={(e)=>setQty(Number(e.target.value))} style={{width:60}} />
        <button onClick={()=>addOrUpdateItem(product._id, qty)} style={{marginLeft:8}}>Add to cart</button>
      </div>
    </div>
  );
}
