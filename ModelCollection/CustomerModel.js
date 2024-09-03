const mongoose = require('mongoose')

// Schema

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is mandatory"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (v) {
                // Simple email regex for demonstration
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                // Validate that phone number is exactly 10 digits
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        type: String,
        require: [true, "Address is mandatory"]

    },
    date: {
        type: String,

    }
}, { timestamps: true })


 const customerModel = mongoose.model("clients", customerSchema)

 module.exports = customerModel;