import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies.get("helpdelphi_api_token")}`,
  },
});
