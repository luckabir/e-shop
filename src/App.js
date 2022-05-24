import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';

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

  useEffect( () => {
      fetchProducts();
      fetchCart();
  }, []);

  

  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        {/*<Products products={products} onAddToCart={handleAddToCart}/>*/}
        <Cart cart={cart}></Cart>
    </div>
  )
}

export default App