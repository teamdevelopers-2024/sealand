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
      const customerData = req.body;
      console.log(customerData);


      if (typeof customerData.vehicleNumber === 'string') {
        customerData.vehicleNumber = customerData.vehicleNumber
          .split(',')
          .map((v) => v.trim())
          .filter((v) => v);
      }
  
      // Validate customer data
      const errors = validateCustomerData(customerData);
      if (errors.length > 0) {
        return res.status(400).json({
          error: true,
          message: "Validation error",
          errors: errors,
        });
      }
  
      // Check if vehicleNumber is a string and convert it to an array

  
      // Save the customer data with the transformed vehicleNumber
      await creditCustomerDb.create(customerData);
  
      res.status(200).json({
        error: false,
        message: "Customer added successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: "Internal server error",
      });
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


async function getCustomers(req,res) {
    try {
        const customers = await creditCustomerDb.find().sort({ _id: -1 });
        console.log(customers)
        res.status(200).json({
            error:false,
            message:"customers fetched successfully",
            data:customers
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"internel server error"
        })
    }
}


async function repayment(req, res) {
    try {
      const { customer, details } = req.body;
  
      const updatedCustomer = await creditCustomerDb.findByIdAndUpdate(
        customer._id,
        {
          $inc: { creditAmount: -details.repaymentAmount },
        },
        { new: true }
      );
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      const updateIncomeData = new IncomeDb({
        workDate:details.repaymentDate,
        customerName:customer.customerName,
        vehicleNumber:"Fron creditRepayment",
        contactNumber:customer.phoneNumber,
        paymentMethod:"Credit Repayment",
        totalServiceCost:details.repaymentAmount,
        workDescriptions:[{
            description:"From creditRepayment",
            amount:details.repaymentAmount,
            reference:customer.phoneNumber
        }]
      })

      if(updatedCustomer.creditAmount == 0){
        await creditCustomerDb.deleteOne({_id:customer._id})
      }

      await updateIncomeData.save()
  

      res.status(200).json({
        error:false,
        message: 'Repayment successful',
      });
    } catch (error) {
      console.error('Error during repayment:', error);
      res.status(500).json({ message: 'Internal server error', error , error:true });
    }
  }
  


export default {
    login,
    addIncome,
    addcustomer,
    incomeHistory,
    addExpense,
    getExpenses,
    getCustomers,
    repayment
}