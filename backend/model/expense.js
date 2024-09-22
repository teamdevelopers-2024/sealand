import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    Date:{
        type:Date,
        required:true
    },
    PayeeName:{
        type:String,
        required :true
    },
    ExpenseType:{
        type:String,
        required:true
    },
    ContactNumber:{
        typer:Number,
        required:true
    },
    PaymentMethod:{
        type:String,
        required:true
    },
    TotalExpense:{
        type:Number,
        required:true
    },
    ExpenseDetails:[
        {
            Description:{
                type:String,
            },
            Amount:{
                type:Number
            },
            Reference:{
                type:String
            }
        }
    ]
});

const ExpenseDb = mongoose.model("Expense", expenseSchema);

export default ExpenseDb;