import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
import functions from '../functions/functions';
import NewNoteBtn from "../components/NewNoteBtn"

const ImportantNotes = () => {
  const navigate = useNavigate();

  let { deleteNote, clickable } = functions()

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteExist, setNoteExist] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getImportantNotesData', {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          email: localStorage.getItem("email")
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.fale === 1) {
        setIsLoading(false)
      }
      else {
        setError("")
        setData(responseData);
        setIsLoading(false)
        if (responseData.length <= 0) {
          setNoteExist(false)
        }
        else {
          setNoteExist(true)
        }
      }

    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (noteExist === false) {
    return (
      <>
      <Navbar isMenu={false}/>
        <div className="el-center-div xl:text-2xl sm:el-center-div text-center text-lg content-center p-2 noNotesDiv">
          <h3 className=''>You Have No <span className='sp_text'>Important</span> Notes Click On Add Note Button To Add New Note.</h3>
          <button className="btn_dark my-3" onClick={()=>clickable(".newNoteBtn")}>Add Note</button>
        </div>
        <NewNoteBtn color="dark"/>
      </>
    )
  }


  return (
    <>
      <Navbar isMenu={false} />
      <div className="impNotes">
        <h1 className='text-3xl'>Your <span className='text-gradiant'>Important Notes</span></h1>
        <div className="gridContainer">

          {
            data ? data.map((elem, index) => {
              return (
                <div className="note" key={index}>
                  <div onClick={() => navigate(`/singleNote/${elem.id}`)}>
                    <div className="flex al-center js-between">
                      <p className='noteCount'>Note {index + 1}</p>
                      {
                        elem.isImportant ?
                          <i className="ri-star-fill text-xl"></i> : ""
                      }
                    </div>
                    <h1 className='heading'>{elem.title}</h1>
                    <p className='content'>{elem.content}</p>
                    <p className="noteDate">{new Date(elem.dateCreated).toDateString()}</p>
                  </div>
                  <div className="noteBtns">
                    <i className="ri-delete-bin-7-fill" onClick={() => deleteNote(elem.id)}></i>
                    <i className="ri-edit-2-fill" onClick={() => navigate(`/editNote/${elem.id}`, { state: { elem: elem } })}></i>
                  </div>
                </div>
              )
            }) : ""
          }
        </div>
        <NewNoteBtn color="dark"/>
      </div>
    </>
  )
}

export default ImportantNotes