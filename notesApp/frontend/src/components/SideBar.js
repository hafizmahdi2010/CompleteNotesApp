import { useEffect, useState } from "react";
import functions from "../functions/functions"
import { Link, Navigate,useNavigate } from 'react-router-dom';


const SideBar = () => {
  const navigate = useNavigate()
  const { toggleClass, toggleLayout, clickable, removeClass, logout } = functions();
  const [isPicExist, setIsPicExist] = useState()
  const [profilePic, setProfilePic] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getUserSomeData', {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          createdBy: localStorage.getItem("userId")
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.fale == 1) {
        setIsLoading(false)
        setIsPicExist(responseData.isPicExist);
        setUsername(responseData.username);
        setProfilePic(responseData.profilePic)
      }
      else {
        setError("")
        setIsLoading(false)
        setIsPicExist(responseData.isPicExist);
        setUsername(responseData.username);
        setProfilePic(responseData.profilePic)
      }

    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
      <div className="sideBar">
        <div className="flex al-center mb-4">

          {
            isPicExist === false ?
              <Link to="/profile"><div className="prifileCircle"></div></Link>
              :
              <>
                <img onClick={()=>navigate("/profile")} src={profilePic} alt="" style={{width:70,height:70,borderRadius:"50%",objectFit:"cover"}} className="mr-3"/>
              </>
          }

          <div className="sidebarHead">
            <div className="block">
              <h3>{username}</h3>
              <p>Free</p>
            </div>
            <i className="ri-close-line closeMenu" onClick={() => removeClass(".sideBar", "active")}></i>
          </div>
        </div>

        <Link to="/importantNotes" style={{ textDecoration: "none", color: "#fff" }}><button className="btn_black"><i className="ri-star-fill"></i> Important Notes</button></Link>
        <button className="btn_black" onClick={() => clickable(".newNoteBtn")}><i className="ri-sticky-note-add-line"></i> New Note</button>

        <div className="updateToPro">
          <h3>Update To Pro</h3>
          <p>Lorem ipsum sapiente, natus tempora nam. Hic dolorem veniam voluptatem?</p>
          <button className="btn_dark">Update To Pro</button>
        </div>

        <button onClick={() => logout()} className="btn_black mt-4"><i className="ri-logout-box-r-line"></i> Logout</button>
        <button className="btn_black" onClick={() => toggleClass(".settingDropDown", "active")}><i className="ri-settings-3-fill"></i> Settings</button>

        <div className="settingDropDown">
          <button className="btn_black" onClick={() => {
            toggleLayout("row");
            window.location.reload()
          }
          }>Change Layout</button>
          <button className="btn_black">Costamize Theme</button>
        </div>

      </div>
    </>
  )
}

export default SideBar