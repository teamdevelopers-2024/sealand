import mongoose from "mongoose";

const creditCustomerSchema = new mongoose.Schema({
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
    CreditAmount:{
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

const creditCustomerDb = mongoose.model("Credit Customers", creditCustomerSchema);

export default creditCustomerDb;