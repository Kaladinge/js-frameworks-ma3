import React from 'react';
import { Link } from 'react-router-dom';;

function PageItem({id,title}) {

  const location = document.location.pathname;

  return (
    <li className="pagelist__page bg-secondary rounded">
      <Link to={location === "/admin" ? `/admin/edit/${id}` : `/page/${id}`} className="text-decoration-none text-light p-2 m-2 d-block">
        <h3>{title.rendered}</h3>
      </Link>
    </li>
  )
}

export default PageItem