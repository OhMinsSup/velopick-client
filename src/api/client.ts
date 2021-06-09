import axios from "axios";

const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5500/api/"
    : process.env.REACT_APP_API_HOST || "/";

const client = axios.create({
  baseURL: host,
  withCredentials: true,
});

export default client;
