// import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './style.css';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function Nav() {


    const [state, dispatch] = useStoreContext();
  
    const { categories } = state;
  
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  
    useEffect(() => {
      if (categoryData) {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categoryData.categories,
        });
        categoryData.categories.forEach((category) => {
          idbPromise('categories', 'put', category);
        });
      } else if (!loading) {
        idbPromise('categories', 'get').then((categories) => {
          dispatch({
            type: UPDATE_CATEGORIES,
            categories: categories,
          });
        });
      }
    }, [categoryData, loading, dispatch]);
  
    const handleClick = (id) => {
      dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: id,
      });
    };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <div class="ml-10 space-x-4">
          <a href="/dashboard" class="text-base font-medium text-white hover:text-indigo-50" key="Pricing">
            Dashboard
          </a>
        <Link to="/orderHistory" class="text-base font-medium text-white hover:text-indigo-50">Order History</Link>
        <a to="/" onClick={() => Auth.logout()} class="cursor-pointer inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Sign out</a>
      </div>
      );
    } else {
      return (
        <div class="ml-10 space-x-4">
        <Link to="/login" class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">Sign in</Link>
        <Link to="/signup" class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">Sign up</Link>
      </div>
      );
    }
  }

  return (
    <div>
    <header class="bg-indigo-600">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
      <div class="flex items-center">
        <Link to="/">
          <span class="sr-only">Workflow</span>
          {/* <p class="text-base font-medium text-white hover:text-indigo-50">Geek Emporium</p> */}
        </Link>
        <div class="hidden ml-10 space-x-8 lg:block">
          <div class="dropdown inline-block relative">
          <button>
          <p class="text-base font-medium text-white hover:text-indigo-50" key="Solutions">
            Categories
          </p>
          </button>
          <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
            {categories.map((item) => (
              <li
              class="cursor-pointer rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              key={item._id}
              onClick={()=>{
                handleClick(item._id);
              }}> {item.name}</li>
            ))}
    </ul>
          </div>

        </div>
        {showNavigation()}
      </div>
    </div>
    <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
    </div>
  </nav>
</header>
      <Link
        to="/"
        class="text-3xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex justify-center"
      >
        Geek Emporium
      </Link>
</div>

  );
}

export default Nav;