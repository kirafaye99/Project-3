import React, {useState} from 'react';
import Axios from 'axios';
import {Image} from 'cloudinary-react';
import { Link } from 'react-router-dom';

function Dashboard(){

    const [imageSelected, setImageSelected] = useState("");
    const [cloudinaryURL, setCloudinaryURL] = useState("");

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

    return<div>
        <div className="md:flex md:items-center md:justify-between bg-blue-500">
            <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate m-3">
            Your Dashboard
            </h1>
            </div>
        </div>
        <div className="mt-4 flex justify-center">
            <button type="submit"
                className="inline-flex items-center pl-3 pr-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 new-post-btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
            clip-rule="evenodd" />
            </svg>
            Create New Post
            </button>
        </div>

        <button type="submit"
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
            
            <Link to="/">← Back to Products</Link>
            </button>
        
            <div class="mx-4">
        <label class="block text-sm font-medium text-gray-700">
             Item Photo
        </label>
        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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

        {/* <input type="file" 
        onChange={(event)=> {
            setImageSelected(event.target.files[0]);
        }}/>
        <button onClick={uploadImage}> Upload Image</button>
        <Image 
        style={{width: 200}}
        cloudName="dxz1v5n4l"publicID="https://res.cloudinary.com/dxz1v5n4l/image/upload/v1632261892/weltdwxohek6naudbyul.jpg"/> */}
    </div>
}



// Credit to YouTube channel Learn with Coffee for client-side upload to cloudinary tutorial.
// picUpload.addEventListener('change', function (event) {
//     let file = event.target.files[0];
//     let formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', cloudinaryUploadPreset);
  
//     axios({
//       url: cloudinaryURL,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       data: formData,
//     })
//       .then(function (res) {
//         uploadBox.setAttribute('style', 'display: none;');
//         imgPreview.src = res.data.secure_url;
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   });

//   return (
//     <>
//       <div ref={myContainer}>I can use the DOM with react ref</div>
//     </>
//   );
// }
export default Dashboard;