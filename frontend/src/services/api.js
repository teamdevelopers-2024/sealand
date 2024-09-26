import axios from "axios";


const api = axios.create({
  baseURL: "https://sealand-api.vercel.app/api",
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


async function addIncome(body) {
  try {
    const response = await api.post('/addIncome',body)
    console.log("income result : ", response.data )
    return response.data
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
    console.log("Error submitting the data:", error);
    return error.response.data
  }
}

async function showIncome() {
  try {
    const response = await api.get(
      "/incomehistory"
    );
    console.log("income history",response.data);
    const data = response.data
    return data
    
  } catch (error) {
    console.error("Error fetching income history data", error);
  } 
}


async function addExpense(body) {
  try {
    const response = await api.post("/addExpense",body)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

async function showExpense() {
  try {
    const response = await api.get("/getExpenses")
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


async function showCustomers(){
  try {
    const response = await api.get("/getCustomers")
    return response.data
  } catch (error) {
    console.log("error fetching customers :",error)
    return error.response.data
  }
}



async function repayment(customer,details) {
  try {
    const response = await api.put("/repayment",{customer,details})
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


async function getTodayIncomeAndExpense() {
  try {
    const response = await api.get('/getTodayIncomeAndExpense')
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


async function addCredit(body) {
  try {
    const response = await api.post("/addCredit",body)
    console.log(response.data )
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


export default {
  login,
  addIncome,
  addcustomer,
  showIncome,
  addExpense,
  showExpense,
  showCustomers,
  repayment,
  getTodayIncomeAndExpense,
  addCredit
};