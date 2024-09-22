import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json", 
  },
  withCredentials: true,
});


async function login(body) {
  try {

    const response = await api.post("/login", body);
    console.log("Login successful:", response.data);
    return response.data;

  } catch (error) {
    console.log(error)
    return error.response.data

  }
}

export default {
  login,
};
