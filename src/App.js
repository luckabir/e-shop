import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import Products from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';

import {Products, Navbar, Cart } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
  const { data } = await commerce.products.list();
  setProducts(data);
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve(); 
    setCart(cart);
    // = setCart(await commerce.cart.retrive());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  }

  const handleRemoveCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  }

  useEffect( () => {
      fetchProducts();
      fetchCart();
  }, []);

  

  return (
    <Router>
  
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
        <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}>
        </Route>
        <Route exact path='/cart' element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty}
         handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart}/>}>
        </Route>
        </Routes>
    </div>
    
    </Router>
  )
}

export default App