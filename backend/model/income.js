import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    WorkDate:{
        type:Date,
        required:true
    },
    CustomerName:{
        type:String,
        required :true
    },
    VehicleNumber:{
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
    TotalAmount:{
        type:Number,
        required:true
    },
    WorkDetails:[
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

const IncomeDb = mongoose.model("Income", incomeSchema);

export default IncomeDb;