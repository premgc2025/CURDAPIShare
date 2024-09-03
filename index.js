
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const moment = require('moment')
const cors = require('cors')
require('dotenv').config();

const DBMS_URL = process.env.DBMS_URL;
const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())


// Imporing Model

const customerModel = require('./ModelCollection/CustomerModel')

mongoose.connect(`${DBMS_URL}/Customer`)
    .then((res) => console.log("MongoDB connection Successful"))
    .catch((err) => console.log(err))




// Create Client details

app.post('/customer', (req, res) => {
    const { name, email, phone, address } = req.body
    const date = moment(Date.now()).format("YYYY-MM-DD")
    const newCustomer = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        date: date
    }
    customerModel.create(newCustomer)
        .then((data) => {
            res.status(201).send({ Message: "User Created successfully" })
        })
        .catch((err) => {
            res.status(403).send({ Message: err.message })
        })
})


// Fetch ALL Customer details

app.get('/customer', (req, res) => {

    customerModel.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(404).send({ Message: " Customer  not found" })
        })

})

// Fetch Single Customer detail

app.get('/customer/:id', (req, res) => {
    const customerId = req.params.id

    customerModel.findOne({ _id: customerId })
        .then((info) => {
            if (info != null) {
                res.status(200).send(info)
            }

            else {
                res.status(404).send({ Message: "This is not exit" })
            }
        })


        .catch((err) => res.status(404).send({ Message: "Customer not found" }))
})


// Delete Customer detail

app.delete('/customer/:id', (req, res) => {
    const customerId = req.params.id
    customerModel.deleteOne({ _id: customerId })
        .then((info) => {           

            res.status(200).send({ Message: "Deleted successully" })
        })
        .catch((err) => res.status(404).send({ Message: "Customer not found" }))
})

// Update Customer Details

app.put('/customer/:id', (req, res) => {
    const customer = req.body;
    const customerId = req.params.id
    customerModel.updateOne({ _id: customerId }, customer)
        .then((info) => res.status(201).send({ Message: "Updated Customer Details successfully" }))
        .catch((err) => res.status(404).send({ Message: "Failed Update", err }))

})


// Server connection and PORT
app.listen(PORT, () => {
    console.log("Server Up and Running PORT :", PORT)
})