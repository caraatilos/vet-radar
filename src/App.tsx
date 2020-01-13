import React, { useState } from 'react';
import './App.css';
import ProductList from './components/Product';
import CartList from './components/Cart';
import { CartItem } from './datatypes/types';

const App = () => {
  let [cartItemList, setCartItemList] = useState <ReadonlyArray<CartItem>>([]);

  const addCartItemHandler = (id: number) => {
    let cartItem = cartItemList.find(c => c.productId === id);
    if (cartItem) {
      setCartItemList(cartItemList.map(c => {
        if (c.productId === id) {
          return { ...c, quantity: c.quantity + 1 };
        }
        return c;
      }));
    } else {
      setCartItemList([...cartItemList, { productId: id, quantity: 1 }]);
    }
  }

  const removeCartItemHandler = (id: number) => {
    setCartItemList([...cartItemList.filter(c => c.productId !== id)]);
  }


  return (
    <div className="App">
      <p>
        Welcome to the Vet Radar front end test
        <span aria-label="hand-wave" role="img">
          👋
        </span>
      </p>
      <p>Products</p>
      <ProductList addCartItem={ addCartItemHandler } />
      <p>Cart</p>
      <CartList removeCartItem={removeCartItemHandler} cartItemList={cartItemList}/>
    </div>
  );
};

export default App;
