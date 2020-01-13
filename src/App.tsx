import React from 'react';
import './App.css';
import ProductList from './components/Product';

const App = () => {
  return (
    <div className="App">
      <p>
        Welcome to the Vet Radar front end test
        <span aria-label="hand-wave" role="img">
          👋
        </span>
      </p>
      <p>Products</p>
      <ProductList />
      <p>Cart</p>
    </div>
  );
};

export default App;
