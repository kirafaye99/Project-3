import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <svg class="flex-shrink-0 h-10 w-10 text-white group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    );
  }

  return (
<div class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
      <div class="w-screen max-w-md">
        <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
          <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div class="flex items-start justify-between">
              <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                Shopping cart
              </h2>
              <div class="ml-3 h-7 flex items-center">
                <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only close" onClick={toggleCart}>Close panel</span>
                  {/* <!-- Heroicon name: outline/x --> */}
                  <svg class="h-6 w-6 close" onClick={toggleCart} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-8">
              <div class="flow-root">
                {state.cart.length ? (
                  <ul role="list" class="-my-6 divide-y divide-gray-200">
                    {state.cart.map((item) => (
                      <CartItem key={item._id} item={item} />
                    ))}
                  </ul>
                ):(
                  <h3>
                    You haven't added anything to your cart yet!
                  </h3>
                )}
              </div>
            </div>
          </div>
            
          <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {calculateTotal()}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div class="mt-6">
              <div className="flex-row space-between">
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout} class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Checkout</button>
            ) : (
              <a href="/login" class="text-indigo-600 font-medium hover:text-indigo-500">Log in to checkout</a>
            )}
              </div>
            </div> 
          </div>
          
          <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                or <button type="button" class="text-indigo-600 font-medium hover:text-indigo-500" onClick={toggleCart}>Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
              </p>
              <br>
              </br>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;
