import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams,useLocation, useNavigate } from 'react-router-dom';


const EditNote = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { elem } = location.state;


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  // errors

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const editNote = async () => {
    try {
      const response = await fetch('http://localhost:8000/editNote', {
        mode: "cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteId: id,
          createdBy:localStorage.getItem("userId"),
          email:localStorage.getItem("email"),
          title:title,
          content:content,
          isImportant:isImportant
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.fale == 1) {
        setError(responseData.msg)
      }
      else {
        setError("")
        setData(responseData);
        setIsLoading(false)
        navigate("/")
      }

    } catch (error) {
      setError(error);
    }
  }

  const submitForm = () => {
    if (title === "") {
      setTitleError("Title Is Required !");
    }
    else if (content === "") {
      setContentError("Content Is Required !");
      setTitleError("");
    }
    else {
      setTitleError("");
      setContentError("");
      editNote()
    }
  }

  useEffect(() => {
    setTitle(elem.title);
    setContent(elem.content);
    setIsImportant(elem.isImportant)
  }, [])
  
  
  return (
    <>
      <Navbar isMenu={false} />
      <div className="editNoteContainer">
        <div className="editNoteForm">
          <h3 className='mb-3'>Edit Note : "{elem.title}"</h3>
          <label htmlFor="title">Title</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name='title' id='title' placeholder='Enter New Title' />
          <p className="error">{titleError}</p>
          <label htmlFor="content">Content</label>
          <textarea onChange={(e) => setContent(e.target.value)} value={content} name="content" id="content" placeholder='Enter New Content'></textarea>

          <div className='flex al-center mt-3' style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <p>Is Important</p>
            <input checked={isImportant === true ? true : false} type="checkbox" onChange={(e) => { setIsImportant(!isImportant) }} />
          </div>

          <p className="error">{contentError}</p>
          <button className="btn btn-dark my-3" onClick={submitForm}>Update Note</button>
        </div>
      </div>
    </>
  )
}

export default EditNote