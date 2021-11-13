import React, { useRef } from "react";
  

// const cloudinaryURL = '	https://api.cloudinary.com/v1_1/dx0fgntfp/upload';
// const cloudinaryUploadPreset = 'nwleexzy';


function Dashboard(){

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