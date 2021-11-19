import React, {useState} from 'react';
import Axios from 'axios';
import {Image} from 'cloudinary-react';
import { Link } from 'react-router-dom';

function Dashboard(){

    const [imageSelected, setImageSelected] = useState("");
    const [cloudinaryURL, setCloudinaryURL] = useState("");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "nwleexzy")

        Axios.post("https://api.cloudinary.com/v1_1/dxz1v5n4l/image/upload", formData).then((Response) => {
        console.log(Response);
        console.log(Response.data);
        console.log(Response.data.public_id);
        let URL = `https://res.cloudinary.com/dxz1v5n4l/image/upload/v1632261892/${Response.data.public_id}.jpg`
        setCloudinaryURL(URL);
        });


    };

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;
    
        // Based on the input type, we set the state of either email, username, and password
        if (inputType === 'title') {
          setTitle(inputValue);
        } else if (inputType === 'description') {
          setDescription(inputValue);
        } else {
          setPrice(inputValue);
        }
      };

      const refreshPage = ()=>{
        window.location.reload();
     }

      const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();
    
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    
        // alert(`Hello ${}`);
    
        // If everything goes according to plan, we want to clear out the input after a successful registration.
        setDescription('');
        setPrice('');
        setTitle('');
      };

      return<div>
      <div className="md:flex md:items-center md:justify-between bg-blue-500">
          <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate m-3">
          Your Dashboard
          </h1>
          </div>
      </div>
      <button type="submit"
              className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
          
          <Link to="/">← Back to Products</Link>
          </button>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto">
          <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white py-6 px-4 space-y-6 sm:p-6">
          <form className="form" class="leading-7 text-sm text-gray-600">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Product Name</h2>  
       <input class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        value={title}
        name="title"
        onChange={handleInputChange}
        type="text"
        placeholder="Product Title"
      /></form>
      <form className="form"class="leading-7 text-sm text-gray-600">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Category</h2>
      </form>
      <form className="form"class="leading-7 text-sm text-gray-600">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Description</h2>
      <input class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        value={description}
        name="description"
        onChange={handleInputChange}
        type="text"
        placeholder="Product description"
      /></form>
      <form className="form" class="leading-7 text-sm text-gray-600">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Price</h2>
      <input class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        value={price}
        name="price"
        onChange={handleInputChange}
        type="number"
        placeholder="Product Price"
      /></form>
      <div className="mx-4">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Attach Image</h2>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
          <svg className="m-5 mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
           aria-hidden="true">
          <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>    
      <div className="flex justify-center text-sm text-gray-600">
        <label for="file-upload"
          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
          <input type="file" 
          onChange={(event)=> {
          setImageSelected(event.target.files[0]);
              }}/>
              <Image className= "m-5"
          style={{width: 1000}}
          cloudName="dxz1v5n4l"publicID={cloudinaryURL}/>
          <button onClick={uploadImage} className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"> Upload Image</button>
        </label>
      </div>
          <p className="text-xs text-gray-500">
        PNG, JPG, GIF up to 10MB
           </p>
          </div>
              <img style={{height: 1000}} />
          </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>

      <div className="mt-4 flex justify-center">
          <button type="submit"
              onClick={refreshPage} className="inline-flex items-center pl-3 pr-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 new-post-btn">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
          clip-rule="evenodd" />
          </svg>
          Create New Post
          </button>
      </div>
</div>
}


export default Dashboard;