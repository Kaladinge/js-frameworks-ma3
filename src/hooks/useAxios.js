import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const url = process.env.REACT_APP_BASE_URL;

export default function useAxios() {
	const [token] = useContext(AuthContext);

	const apiClient = axios.create({
		baseURL: url,
	});

	apiClient.interceptors.request.use(function (config) {
		const tokenKey = token;
		config.headers.Authorization = tokenKey ? `Bearer ${tokenKey}` : "";
		return config;
	});

	return apiClient;
}