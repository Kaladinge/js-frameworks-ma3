import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { BASE_URL, PAGES_PATH } from '../../constants/api';
import PageItem from './PageItem';

function Pages() {

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchPagesError] = useState(null);
  
  const url = BASE_URL + PAGES_PATH;
  
  useEffect(() => {
    const getPages = async() => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setPages(result);
      } catch(error) {
        fetchPagesError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPages();
  }, [url])

  if (loading) {
    return <div className="text-center fs-3">Loading...</div>
  }

  if (fetchPagesError) {
    return <div className="text-danger">There was a fetch pages error</div>
  }

  return (
    <Container>
      <ul className="pagelist mt-3 text-center list-unstyled mx-auto">
        {pages.map(page => {
          const {id, title} = page;
          return <PageItem key={page.id} id={id} title={title}/>
        })}
      </ul>
    </Container>
  )
}

export default Pages