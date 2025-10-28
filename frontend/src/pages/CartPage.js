import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartPage(){
  const { cart, addOrUpdateItem, removeItem } = useContext(CartContext);

  if (!cart) return <div>Loading cart...</div>;

  const total = (cart.items || []).reduce((s, it) => s + (it.product?.price || 0) * it.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {(!cart.items || cart.items.length === 0) && <div>Cart is empty</div>}
      <div>
        {cart.items && cart.items.map(it => (
          <div key={it.product._id} style={{borderBottom:'1px solid #eee', padding:10}}>
            <h3>{it.product.title}</h3>
            <p>₹{it.product.price} x {it.quantity} = ₹{(it.product.price * it.quantity).toFixed(2)}</p>
            <div>
              <button onClick={()=> addOrUpdateItem(it.product._id, Math.max(1, it.quantity - 1))}>-</button>
              <button onClick={()=> addOrUpdateItem(it.product._id, it.quantity + 1)}>+</button>
              <button onClick={()=> removeItem(it.product._id)} style={{marginLeft:8}}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button disabled={!cart.items || cart.items.length===0}>Checkout (mock)</button>
    </div>
  );
}
