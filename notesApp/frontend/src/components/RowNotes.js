import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import functions from '../functions/functions';

const RowNotes = () => {
  const navigate = useNavigate();
  const { clickable, deleteNote } = functions()

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noteExist, setNoteExist] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getNotesData', {
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

      if (responseData.fale === 1) {
        setIsLoading(false)
      }
      else {
        setError("")
        setData(responseData);
        setNoteExist(true)
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (noteExist === false) {
    return (
      <div className='sm:el-center-div text-center text-lg content-center p-2 noNotesDiv'>
        <h3>You Have No Note Click On Add Note Button To Create New Note.</h3>
        <button className="btn_dark" onClick={() => clickable(".newNoteBtn")}>Add Note</button>
      </div>
    )
  }


  return (
    <>
      <div className="rowContainer">
        {
          data ? data.map((elem, index) => {
            return (
              <div className="note my-2" key={index}>
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
                  <div className="noteDate">{new Date(elem.dateCreated).toDateString()}</div>

                  <div className="noteBtns">
                    <i className="ri-delete-bin-7-fill" onClick={() => deleteNote(elem.id)}></i>
                    <i className="ri-edit-2-fill" onClick={() => navigate(`/editNote/${elem.id}`, { state: { elem: elem } })}></i>
                  </div>
                </div>
              </div>
            )
          }) : ""
        }
      </div>
      
    </>
  )
}

export default RowNotes