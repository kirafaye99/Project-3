import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Signup
      </h2>
      <form onSubmit={handleFormSubmit}>
      <div>
      <label htmlFor="firstName">First Name:</label>
      <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="First"
        name="firstName"
        type="firstName"
        id="firstName"
        onChange={handleChange}
      />
      </div>
      <div className="flex-row space-between my-2">
      <label htmlFor="lastName">Last Name:</label>
      <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Last"
        name="lastName"
        type="lastName"
        id="lastName"
        onChange={handleChange}
      />
      </div>
      <div className="flex-row space-between my-2">
      <label htmlFor="email">Email:</label>
      <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="youremail@test.com"
        name="email"
        type="email"
        id="email"
        onChange={handleChange}
      />
      </div>
      <div className="flex-row space-between my-2">
      <label htmlFor="pwd">Password:</label>
      <input className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="******"
        name="password"
        type="password"
        id="pwd"
        onChange={handleChange}
      />
      </div>
          <div>
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
 
  );
}

export default Signup;
