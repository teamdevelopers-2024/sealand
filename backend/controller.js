import 'dotenv/config'
import IncomeDb from './model/income.js'
import { validateIncomeData } from './services/IncomeValidator.js'
import creditCustomerDb from './model/creditCustomers.js'
import { validateCustomerData } from './services/CustomerValidator.js'
import { validateExpenseData } from './services/expenseValidator.js'
import ExpenseDb from './model/expense.js'


async function login(req, res) {
    try {
        const ogUsername = process.env.ADMIN_USERNAME
        const ogPassword = process.env.ADMIN_PASSWORD
        console.log(ogUsername, ogPassword)
        const { username, password } = req.body
        console.log(req.body)
        if (!username) {
            return res.status(400).json({
                error: true,
                message: "please enter username"
            })
        }
        if (!password) {
            return res.status(400).json({
                error: true,
                message: 'please enter password'
            })
        }
        if (username == ogUsername && password == ogPassword) {
            res.status(200).json({
                error: false,
                message: "admin authenticated successfully"
            })
        } else {
            res.status(400).json({
                error: true,
                message: "invalid credantials"
            })
        }

    } catch (error) {
        res.status(500).json({
            error: true,
            message: "internel server error"
        })
    }
}

async function addcustomer(req, res) {
    try {
        const customerData = req.body
        console.log(customerData);
        const errors = validateCustomerData(customerData);

        if (errors.length > 0) {
            return res.status(400).json({
                error: true,
                message: "validation error",
                errors: errors
            });
        }

        await creditCustomerDb.create(customerData)

        res.status(200).json({
            error: false,
            message: "customer added Successfully"
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "internel server error"
        })
    }

}


async function addIncome(req, res) {
    try {
        const incomeData = req.body;

        const errors = validateIncomeData(incomeData);

        if (errors.length > 0) {
            return res.status(400).json({
                error: true,
                message: "validation error",
                errors: errors
            });
        }

        await IncomeDb.create(incomeData)
        res.status(200).json({
            error: false,
            message: "income added Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "internel server error"
        })
    }
}


export async function incomeHistory(req, res) {
    try {
        const incomes = await IncomeDb.find().sort({ _id: -1 });
        console.log(incomes)
        res.status(200).json({
            error: false,
            message: "Income fetched successfully",
            data: incomes,
        });
        
    } catch (error) {
        console.error("Error fetching income history:", error);

        res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
}



async function addExpense(req,res) {
    try {
       const expenseData = req.body
       console.log(expenseData);
       const errors = await validateExpenseData(expenseData)

       if (errors.length > 0) {
        return res.status(400).json({
            error: true,
            message: "validation error",
            errors: errors
        });
    }


    await ExpenseDb.create(expenseData)
    res.status(200).json({
        error:false,
        message:"expense added successfully"
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"internel server error"
        })
    }
}



async function getExpenses(req,res) {
    try {
        const expense = await ExpenseDb.find().sort({ _id: -1 });
        res.status(200).json({
            error: false,
            message: "Income fetched successfully",
            data: expense,
        });
    } catch (error) {
        console.error("Error fetching income history:", error);

        res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
}


export default {
    login,
    addIncome,
    addcustomer,
    incomeHistory,
    addExpense,
    getExpenses
}