import React from 'react'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <>
      <Navbar isMenu={false}/>

      <div className="el-center-div">
        <h1 className='text-xl'>404 Page Note Found</h1>
        <Link to="/" style={{textDecoration:"none"}}><button className='btn btn_dark' style={{color:"#fff"}}>Go To Home</button></Link>
      </div>

    </>
  )
}

export default NoPage