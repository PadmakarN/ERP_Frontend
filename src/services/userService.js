import axios from "axios";
import API_URL from "../Config/apiConfig";

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/api/usermaster`, {
    withCredentials: true
  });
  return res.data;
};