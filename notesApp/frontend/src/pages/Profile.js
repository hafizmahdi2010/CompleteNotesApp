import React, { useEffect, useState } from 'react'
import NewNoteBtn from "../components/NewNoteBtn"
import functions from "../functions/functions"
import Navbar from '../components/Navbar'
import Note from '../components/Note'

const Profile = () => {
  const { clickable } = functions();
  const [data, setData] = useState(null);
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [isPicExist, setIsPicExist] = useState()
  const [joinIn, setjoinIn] = useState("")

  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };


  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', localStorage.getItem("userId"));
    formData.append('username', localStorage.getItem("username"));
    formData.append('email', localStorage.getItem("email"));

    fetch('http://localhost:8000/uploadProfilePic', {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        console.log("SuccessFully Get Response.");
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };



  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getUserData', {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId")
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.fale === 1) {
        setError(responseData.msg)
      }
      else {
        setError("")
        setData(responseData);
        setUsername(responseData[0].username);
        setName(responseData[0].name);
        setEmail(responseData[0].email);
        setjoinIn(responseData[0].joinIn);
        setProfilePic(responseData[0].profilePic);
        setIsPicExist(responseData[0].isPicExist)
        setIsLoading(false)
      }

    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  
  if (isLoading) {
    return <div>Loading... Please Wait {name}</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <>
      <Navbar isMenu={false} />
      <div className="profile mb-5">
        <div className="flex al-center">
          {
            isPicExist === false ?
              <div className="profilePic">
                <label htmlFor='profilePicFile' className="addPic"><i className="ri-image-add-line"></i></label>
              </div> : <>
                <img src={profilePic} alt="" className='profilePicImg' />
              </>
          }
          <input type="file" onChange={handleFileChange} name='profilePicFile' id='profilePicFile' hidden />

          {
            image ? <button onClick={handleUpload}>Upload</button> : ""
          }

          <div className="block">
            <h3>{username}</h3>
            <p>Join In : {new Date(joinIn).toDateString()} &nbsp;&nbsp;<span className='version'>Free</span></p>
            <p className="noteCount">{email}</p>
          </div>
        </div>

        <div className="flex al-center js-between yourNotesHead">
          <h3>Your Notes</h3>

          <div className="flex al-center gap-2 md:gap-1">
            <button className="btn_dark addProfilePicBtn" onClick={() => clickable("#profilePicFile")}>{isPicExist === false ? "Add" : "Change"} Profile Pic</button>
            <button className="btn_dark" onClick={() => clickable(".newNoteBtn")}>Create Note</button>
          </div>
        </div>


        <div className="yourNotes">

          {
            data && data[0].msg !== "No Notes Found" ?
              data.map((elem, index) => {
                return (
                  <Note elem={elem} index={index + 1} key={index}/>
                )
              }) : <div className='text-center text-1xl sm:text-sm content-center p-2'>
                <h3>You Have No Note Click On Add Note Button To Create New Note.</h3>
                <button className="btn_dark" onClick={() => clickable(".newNoteBtn")}>Add Note</button>
              </div>
          }
        </div>

        <NewNoteBtn color="dark" />
      </div>
    </>
  )
}

export default Profile

