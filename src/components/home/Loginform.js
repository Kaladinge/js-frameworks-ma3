import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, TOKEN_PATH } from '../../constants/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

function Loginform() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [token, setToken] = useContext(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  async function onSubmit(data) {

    setSubmitting(true);

    try {
      const response = await axios.post(url, data);
      setToken(response.data.token);
      setLoginSuccess(true);
      navigate("/admin");
    } catch(error) {
      setLoginError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form bg-light w-75 mx-auto p-3 mt-3">
      <fieldset disabled={submitting}>
        <div className="d-flex flex-column">
            <label htmlFor="name" className="mt-3">Username</label>
            <input {...register("username")} id="username"/>
            {errors.username && <span className="mb-3 text-danger">{errors.username.message}</span>}
        </div>
        <div className="d-flex flex-column">
            <label htmlFor="age" className="mt-3">Password</label>
            <input {...register("password")} id="password"/>
            {errors.password && <span className="mb-3 text-danger">{errors.password.message}</span>}
        </div>

        <button className="mt-3 bg-primary text-white w-100 border border-none rounded p-2">Login</button>
      </fieldset>

      {loginSuccess && <div className="text-success">Successfully logged in</div>}
      {loginError && <div className="text-danger">UserName or password was incorrect</div>}
    </form>
  )
}

export default Loginform