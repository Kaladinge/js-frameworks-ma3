import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PAGES_PATH } from '../../constants/api';
import * as yup from "yup";
import useAxios from '../../hooks/useAxios';
import Heading from '../layout/Heading';

const schema = yup.object().shape({
	title: yup.string().required("Please enter a title"),
});

function Edit() {

const [content, setContent] = useState([]);
const [updateSucces, setUpdateSuccess] = useState(false);
const [loading, setLoading] = useState(true);
const [fetchPageError, setFetchPageError] = useState(null);
const [editPageError, setEditPageError] = useState();
const [updateInProgress, setUpdateInProgress] = useState(false);
const [privateWarning, setPrivateWarning] = useState(false);

const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

const http = useAxios();

const { id } = useParams();

const url = PAGES_PATH + id;

useEffect(() => {
  const getEditPage = async() => {
    
    try {
      const response = await http.get(url);
      setContent(response.data);
    } catch (error) {
      setFetchPageError(error.toString());
    } finally {
      setLoading(false);
    }
  }
   getEditPage();
}, [url, http])

async function onSubmit(data) {

  setUpdateInProgress(true);
  try {
    const response = await http.put(url, data);
    setUpdateSuccess(true);
  } catch (error) {
    setEditPageError(error.toString());
  } finally {
    setUpdateInProgress(false);
  }
}

if (loading) {
  return <div className="text-center fs-3">Loading..</div>
}

if (fetchPageError) {
  return <div className="text-danger">There was a fetch page error</div>
}

const status = content.status === "publish" ? "private" : "publish";

function showWarning(event) {
  setPrivateWarning(false);
  if (event.target.value === "private") {
    setPrivateWarning(true);
  };
}

  return (

    <div>
      <Heading title="Edit Page"/>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form bg-light w-75 mx-auto p-3 mt-3">
        <fieldset disabled={updateInProgress}>
          <div className="d-flex flex-column mt-3">
            <input name="title" defaultValue={content.title.rendered} {...register("title")} className="p-2"/>
            {errors.title && <div>{errors.title.message}</div>}
          </div>

          <div className="mt-3 mb-3">
            <select name="publish-status" id="publish-status" {...register("status")} className="w-25 p-2" onChange={showWarning}>
              <option value={content.status}>{content.status}</option>
              <option value={status}>{status}</option>
            </select>
            {privateWarning && <div className="text-danger">If choosing this option the page will disappear from the list and only an admin can publish it again</div>}
          </div>
        </fieldset>
                
        <button className="w-100 bg-warning text-light border border-none rounded p-2 text-dark">Edit</button>

        {updateSucces && <div className="text-success">Page updated successfully</div>}
        {editPageError && <div className="text-danger">Page could not be edited at this time</div>}
      </form>
    </div>
  )
}

export default Edit