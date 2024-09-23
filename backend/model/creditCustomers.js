import mongoose from "mongoose";

const creditCustomerSchema = new mongoose.Schema({
    dateOfService:{
        type:Date,
        required:true
    },
    customerName:{
        type:String,
        required :true
    },
    vehicleNumber:{
        type:String,
        required:true},
    phoneNumber:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    creditAmount:{
        type:Number,
        required:true
    },
    workDetails:[
        {
            description:{
                type:String,
            },
            amount:{
                type:Number
            },
            reference:{
                type:String
            }
        }
    ]
});

const creditCustomerDb = mongoose.model("CreditCustomers", creditCustomerSchema);

export default creditCustomerDb;