import React, {useState} from 'react';
import Axios from 'axios';
import {Image} from 'cloudinary-react';
import { Link } from 'react-router-dom';




// const cloudinaryURL = '	https://api.cloudinary.com/v1_1/dx0fgntfp/upload';
// const cloudinaryUploadPreset = 'nwleexzy';


function Dashboard(){

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "nwleexzy")

        Axios.post("https://api.cloudinary.com/v1_1/dxz1v5n4l/image/upload", formData).then((Response) => {
        console.log(Response);
        });
    };

    return<div>
        <Link to="/">← Back to Products</Link>
        <input type="file" 
        onChange={(event)=> {
            setImageSelected(event.target.files[0]);
        }}/>
        <button onClick={uploadImage}> Upload Image</button>
        <Image 
        style={{width: 200}}
        cloudName="dxz1v5n4l"publicID="https://res.cloudinary.com/dxz1v5n4l/image/upload/v1632261892/weltdwxohek6naudbyul.jpg"/>
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