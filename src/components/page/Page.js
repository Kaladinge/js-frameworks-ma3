import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, PAGES_PATH } from '../../constants/api';
import Heading from '../layout/Heading';

function Page() {

  const [content, setContent] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fetchPageError, setFetchPageError] = useState(null);

  const url = BASE_URL + PAGES_PATH;

  const { id } = useParams("/");
  const navigate = useNavigate();
  if(!id) {
    navigate("/");
  }

  const newUrl = url + id;

  useEffect(() => {
    const getPage = async() => {
      try {
      const response = await fetch(newUrl);
      const result = await response.json();
      setContent(result);
    
      }catch (error) {
        setFetchPageError(error.toString());
      } finally {
        setLoader(false);
      }
    }
    getPage();
  }, [newUrl])

  if (loader) {
    return <div className="text-center fs-3">Loading...</div>
  }
  
  if (fetchPageError) {
    return <div className="text-danger">There was a fetch page error</div>
  }
  
  function createMarkup() {
    return {__html: content.excerpt.rendered}
  }

  const options = {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
  };

  const formatDate = new Intl.DateTimeFormat("en-UK", options).format(new Date(content.date));

  return (
    <>
      <Heading title={content.title.rendered}/>
      <h4 className="fs-5">{formatDate}</h4>
      <p dangerouslySetInnerHTML={createMarkup()}/>
    </>
  )
}

export default Page