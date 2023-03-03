import axios from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND}`;

export default axios;
