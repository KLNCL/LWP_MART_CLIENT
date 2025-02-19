// import React, { useState } from 'react'
// import "./BecomeSeller.scss"
// import { IoMdCloseCircle } from "react-icons/io";
// import { MdOutlinePhotoCamera } from "react-icons/md";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";


// export default function BecomeSeller(props) {

//   const navigate = useNavigate();
//   const [errors, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [address, setAddress] = useState('');
//   const [contactNo, setContactNo] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [enail, setEmail] = useState('');
  
//   const getUserDetailsFromToken = () => {
//     const token = localStorage.getItem("authToken"); // Retrieve token from local storage
//     if (!token) return null;
  
//     try {
//       return jwtDecode(token); // Decode token and return full payload
//     } catch (error) {
//       console.error("Invalid token", error);
//       return null;
//     }
//   };
  
//   const userDetails = getUserDetailsFromToken(); // Store all token details
//   const userId = userDetails?._id;
//   console.log("User Id:", userId);


  

//   const becomeAseller = async (e) => {
//     e.preventDefault();

  

//     // Prepare data payload
//     const payload = { image, fullName,address,contactNo , description };

//     try {
//       const res = await instance.post(`/updateuser/${userId}`, payload);
//       if (res.status === 200) {
//         setSuccess("Now you are a seller!");
//         setError('');
//         setTimeout(() => {
//           navigate('/profile');
//         });
//       } else {
//         setError("Failed to register as a seller!");
//       }
//     } catch (error) {
//       const errorMsg = error.response?.data?.message || 'Something went wrong';
//       console.error("Error during registration:", error);
//       setError(errorMsg);
//     }
//   };


//  return (
//     <div className="BecomeSeller-container">
//       <div className="card">
//         <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
//           <IoMdCloseCircle onClick={() => props.closeBecomeSellerPopupWindow()} size={28} color='red' style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }} />
//         </div>
//         <div className="title">
//           <h1 style={{ paddingBottom: "15px" }}>Welcome to LWP Mart</h1>
//           <p>Please complete your profile to get start</p>
//         </div>
//         <div className="profile-picture">
//           <p>select a profile picture</p>
//           <div className="image" >
//           <MdOutlinePhotoCamera size={35} style={{cursor: "pointer" }}/>
//           </div>
//         </div>
//         <div className="body">
//           <div className="input-filed">
//             <span style={{ marginBottom: "5px" }}>Full Name:</span>
//             <input type='text' name='fullName' placeholder='Full Name' onChange={(e) => setFullName(e.target.value)}/>
//           </div>
//           <div className="input-filed">
//             <span style={{ marginBottom:"5px"}}>Address:</span>
//             <input type='text' name='address' placeholder='Address' onChange={(e) => setAddress(e.target.value)}/>
//           </div>
//           <div className="input-filed">
//             <span style={{ marginBottom:"5px"}}>Contact No:</span>
//             <input type='text' name='conatctNo' placeholder='contact No' onChange={(e) => setContactNo(e.target.value)}/>
//           </div>
//           <div className="input-filed">
//             <span style={{ marginBottom:"5px"}}>Email:</span>
//             <input type='text' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
//           </div>
//           <div  className="input-filed">
//           <span>Description:</span>
//             <textarea name='description' style={{width:"200px", borderRedius:"6px", backgroundColor:"rgba(210, 209, 209, 0.319" }} rows={4} placeholder='Description' 
//             onChange={(e) => setDescription(e.target.value)}/>
//           </div>
//         </div>

//         <div style={{width:"100%", display:"flex", justifyContent:"flex-end",marginTop:"28px", marginBottom:"18px" }}>
//           <button onClick={(e) => becomeAseller(e)}  style={{marginRight:"20px"}}>Become a seller</button>
//           </div>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import "./BecomeSeller.scss";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import instance from '../../utils/AxiosInstance';

export default function BecomeSeller(props) {
  const navigate = useNavigate();
  const [errors, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');


  const getUserDetailsFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const userDetails = getUserDetailsFromToken();
  const userId = userDetails?._id;


  const becomeAseller = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("fullName", fullName);
    payload.append("address", address);
    payload.append("contactNo", contactNo);
    payload.append("email", email);
    payload.append("description", description);


    try {
      const res = await instance.post(`/updateuser/${userId}`, payload, {  
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        setSuccess("Now you are a seller!");
        setError('');
        
          navigate('/profile');
       
      } else {
        setError("Failed to register as a seller!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      console.error("Error during registration:", error);
      setError(errorMsg);
    }
  };

  return (
    <div className="BecomeSeller-container">
      <div className="card">
        <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
          <IoMdCloseCircle
            onClick={() => props.closeBecomeSellerPopupWindow()}
            size={28}
            color='red'
            style={{ paddingRight: "5px", marginTop: "5px", cursor: "pointer" }}
          />
        </div>
        <div className="title">
          <h1 style={{ paddingBottom: "15px" }}>Welcome to LWP Mart</h1>
          <p>Please complete your profile to get started</p>
        </div>
        <div className="profile-picture">
          <p>Select a profile picture</p>
          <div className="image">
            <label htmlFor="imageUpload">
              <MdOutlinePhotoCamera size={35} style={{ cursor: "pointer" }} />
            </label>
            <input
              id="imageUpload"
              type="file"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
           
            />
          </div>
        </div>
        <div className="body">
          <div className="input-filed">
            <span>Full Name:</span>
            <input type='text' name='fullName' placeholder='Full Name' onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Address:</span>
            <input type='text' name='address' placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Contact No:</span>
            <input type='text' name='contactNo' placeholder='Contact No' onChange={(e) => setContactNo(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Email:</span>
            <input type='text' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-filed">
            <span>Description:</span>
            <textarea
              name='description'
              style={{ width: "200px", borderRadius: "6px", backgroundColor: "rgba(210, 209, 209, 0.319)" }}
              rows={4}
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "28px", marginBottom: "18px" }}>
          <button onClick={(e) => becomeAseller(e)} style={{ marginRight: "20px" }}>Become a seller</button>
        </div>
      </div>
    </div>
  );
}

