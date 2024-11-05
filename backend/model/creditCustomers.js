import mongoose from "mongoose";

const creditCustomerSchema = new mongoose.Schema({
    dateOfService: {
        type: Date,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    vehicleNumber: [
        {
            type: String,
        },
    ],
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    creditAmount: {
        type: Number,
        required: true,
    },
    paidAmount: {
        type: Number,
        default: 0,
    },
    transactionHistory: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
            },
            date: Date,
            vehicleNumber: String,
            phoneNumber: String,
            paymentType: String,
            Amount: Number,
            paidAmount : {
                type : Number , 
                default : 0 
            },
            isCredit: {
                type: Boolean,
                default: true,
            },
            workDetails: [
                {
                    description: {
                        type: String,
                    },
                    amount: {
                        type: Number,
                    },
                    reference: {
                        type: String,
                    },
                },
            ],
        }
    ],
});

const creditCustomerDb = mongoose.model("CreditCustomers", creditCustomerSchema);

export default creditCustomerDb;
