import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3001/api",
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

async function addcustomer(data) {
  try {
    console.log(data);
    
    const response = await api.post("/addcustomer", data);
    console.log("Data submitted successfully:", response.data);
    return response.data
  } catch (error) {
    console.error("Error submitting the data:", error);
  }
}

export default {
  login,
  addcustomer
};
