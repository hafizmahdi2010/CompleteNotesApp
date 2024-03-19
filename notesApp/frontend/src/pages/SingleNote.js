import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

const SingleNote = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/getSingleNoteData', {
        mode:"cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId:id
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      
      if(responseData.fale == 1){
        setError(responseData.msg)
      }
      else{
      setError("")
      setData(responseData);
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


  return (
    <>
      <Navbar isMenu={false}/>
      <div className="singleNote">
        <h1>{data ? data.title : ""}</h1>
        <p className="noteDate">{data ? new Date(data.dateCreated).toLocaleString() : ""}</p>
        <div className="singleNoteContent">
          <p>{data ? data.content : ""}</p>
        </div>

        <div className="noteBtns">
        <i className="ri-delete-bin-7-fill"></i>
        <i className="ri-edit-2-fill"></i>
        </div>
      </div>
    </>
  )
}

export default SingleNote