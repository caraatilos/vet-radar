import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import ReactDOM from 'react-dom';
import {products} from './constants/index';

import App from './App';
import ProductList from './components/Product';
import CartList from './components/Cart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Shows the Products and Cart list header', () => {
  const { getByText } = render(<App />);
  
  expect(getByText('Products')).toBeTruthy();
  expect(getByText('Cart')).toBeTruthy();
});

test('Shows the Product list items', () => {
  const component = render(<App />);
  products.forEach(p=>{
    expect(component.getByText(p.name)).not.toBeNull();
    expect(component.getByText(p.price.toFixed(2).toString())).not.toBeNull();
  });  
});

test('Should call add cart item handler', () => {
  const addCartItemFn = jest.fn();
  const component = render(<ProductList addCartItem={addCartItemFn} />);
  const buttons = component.queryAllByText('Add');
  buttons.forEach(b=>{
    fireEvent.click(b);
  });  
  expect(addCartItemFn).toHaveBeenCalledTimes(5);
});

test('Should display cart items and total', () => {
  const removeCartItemFn = jest.fn();
  const cartItemList = [
      {productId: 1, quantity: 2},
      {productId: 2, quantity: 2},
      {productId: 3, quantity: 2},
      {productId: 4, quantity: 2},
      {productId: 5, quantity: 1},
  ];
  const component = render(<CartList cartItemList={cartItemList} removeCartItem={removeCartItemFn} />);
  let total = 0;
  products.forEach((p, i)=>{
    expect(component.getByText(p.name)).not.toBeNull();
    total += +(p.price * cartItemList[i].quantity).toFixed(2);
  });
  expect(component.getByText(total.toString())).not.toBeNull();  
});

test('Should call remove cart item handler', () => {
  const removeCartItemFn = jest.fn();
  const cartItemList = [
      {productId: 1, quantity: 2},
      {productId: 2, quantity: 2},
      {productId: 3, quantity: 2},
      {productId: 4, quantity: 2},
      {productId: 5, quantity: 1},
  ];
  const component = render(<CartList cartItemList={cartItemList} removeCartItem={removeCartItemFn} />);
  const buttons = component.queryAllByText('Remove');
  buttons.forEach(b=>{
    fireEvent.click(b);
  });  
  expect(removeCartItemFn).toHaveBeenCalledTimes(5);
});