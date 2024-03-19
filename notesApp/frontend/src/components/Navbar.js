
import React, { useState } from 'react';
import functions from "../functions/functions";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const navigate = useNavigate();
  const { addClass, removeClass, toggleClass , elemFocus} = functions();

  const [searchVal, setSearchVal] = useState("")
  
  function handelSearchVal(e){
    if (e.key === 'Enter') {
      navigate(`/searchPage?searchQuery=${searchVal}`)
    }
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link className='logoText' to="/" style={{ textDecoration: "none", color: "#fff" }}><h1>NoteifyCloud</h1></Link>
      </div>

      <div className="serachArea">
        <input type="text" placeholder='Search Note' className='navbarInputSearch' value={searchVal} onKeyUp={(e)=>handelSearchVal(e)}
         onChange={(e)=>setSearchVal(e.target.value)}/>
        <i className="ri-close-fill" onClick={() => removeClass(".serachArea", "active")}></i>
      </div>
      <div className="icons">
        <i className="ri-search-line" onClick={() => {addClass(".serachArea", "active"); elemFocus(".navbarInputSearch")} }></i>
        {
          props.isMenu === true ?
            <i className="ri-menu-3-line menuIcon" onClick={() => toggleClass(".sideBar", "active")}></i>
            : ""
        }
      </div>
    </div>
  );
};

export default Navbar;
