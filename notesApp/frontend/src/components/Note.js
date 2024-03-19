import React from 'react'
import { useNavigate } from 'react-router-dom'
import functions from '../functions/functions'

const Note = ({ elem, index }) => {
  const navigate = useNavigate();
  const { deleteNote } = functions()
  return (
    <>
      <div className="note" key={index}>
        <div onClick={() => navigate(`/singleNote/${elem.id}`)}>
          <div className="flex al-center js-between my-0">
            <p className='noteCount'>Note {index}</p>
            {
              elem.isImportant ?
                <i className="ri-star-fill text-xl"></i> : ""
            }
          </div>
          <h1 className='heading'>{elem.title}</h1>
          <p className='content'>{elem.content}</p>
          <p className="noteDate">{new Date(elem.noteCreated).toDateString()}</p>
        </div>
        <div className="noteBtns">
          <i className="ri-delete-bin-7-fill" onClick={() => deleteNote(elem.id)}></i>
          <i className="ri-edit-2-fill" onClick={() => navigate(`/editNote/${elem.id}`, { state: { elem: elem } })}></i>
        </div>
      </div>
     
    </>
  )
}

export default Note