import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  // const removeFromCart = () => {
  //   dispatch({
  //     type: REMOVE_FROM_CART,
  //     _id: currentProduct._id,
  //   });

  //   idbPromise('cart', 'delete', { ...currentProduct });
  // };

  return (
    <article class="post">
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <div class="flex flex-col-reverse">
          <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
              <button id="post-img"
                class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                aria-controls="tabs-1-panel-1" role="tab" type="button">
                <span class="sr-only">
                  Angled view
                </span>
                <span class="ring-transparent absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                  aria-hidden="true"></span>
              </button>
            </div>
          </div>

          <div class="w-full aspect-w-1 aspect-h-1">
            <div id="post-img" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
              <img src={`/images/${currentProduct.image}`} alt="Product photo"
                class="w-full h-full object-center object-cover sm:rounded-lg"/>
            </div>
          </div>
        </div>

        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{currentProduct.name}</h1>
          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl text-gray-900">${currentProduct.price}</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <div class="text-base text-gray-700 space-y-6">
              <p>{currentProduct.description}</p>
            </div>
          </div>

          <form class="mt-6">
            <div class="mt-10 flex sm:flex-col1">
              <button type="submit"
              onClick={addToCart}
                class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full">Add
                to cart</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Cart />
</article>
  );
}

export default Detail;
