import Navbar from '../components/Navbar'
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || '';

  useEffect(() => {
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
        } else {
          setDocuments(responseData);
          setIsLoading(false);
        }

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!documents) return;

    const filteredByTitle = documents.filter(doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredByTitle.length > 0) {
      setSearchResults(filteredByTitle);

      setError('');
    } else {
      const filteredByContent = documents.filter(doc =>
        doc.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredByContent.length > 0) {
        setSearchResults(filteredByContent);
        setError('');
      } else {
        setSearchResults([]);
        setError('Search results not found.');
      }
    }
  }, [documents, searchQuery]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>
      <Navbar isMenu={false} />
      <div className="el-center-div text-center text-lg content-center p-2 noNotesDiv">
        <h3 className='text-xl my-4'>Search Results Not Found For "<span className='sp_text'>{searchQuery}</span>"</h3>
        <button className="btn_dark" onClick={() => navigate("/")}>Go Back</button>
      </div>
    </>;
  }

  return (
    <>
      <Navbar isMenu={false} />
      <div className="searchPage">
        <h1 className="sm:text-sm text-1xl leading-none mb-5">Search Results For "<span className='sp_text'>{searchQuery}</span>"
         <br /><span className='text-xl'><span className='sp_text'>{searchResults.length}</span> {searchResults.length > 1 ? "Results" : "Result"} Found</span></h1>

        {
          searchResults ? searchResults.map((elem, index) => {
            return (
              <div key={index} className="searchResult note my-2" onClick={() => navigate(`/singleNote/${elem.id}`)}>
                <h2>{elem.title}</h2>
                <p>{elem.content}</p>
                <p className="noteDate">{new Date(elem.dateCreated).toDateString()}</p>
              </div>
            )
          }) : ""
        }
      </div>
    </>
  )
}

export default SearchPage