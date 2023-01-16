import axios from "axios";

export const fetchFromAPI = async (url) => {
  let users = await axios.get(url);
  console.log(users?.data);
  return users?.data;
};
