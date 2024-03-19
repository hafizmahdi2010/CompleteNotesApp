import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import GridNotes from '../components/GridNotes';
import RowNotes from '../components/RowNotes';
import NewNoteBtn from '../components/NewNoteBtn';
import Navbar from '../components/Navbar';

const Home = () => {

  const [layout, setLayout] = useState("grid");
 

  useEffect(() => {
    let getLayout = localStorage.getItem('layout');
    if (getLayout === "grid") {
      setLayout("grid")
    }
    else {
      setLayout("row")
    }
  }, [layout])


  return (
    <>
      <Navbar isMenu={true}/>
      <div className="flex mainContainer">
        <SideBar />
        <div className="content">
          {layout === "grid" ? <GridNotes /> : <RowNotes />}
          <NewNoteBtn/>
        </div>
      </div>
    </>
  )
}

export default Home