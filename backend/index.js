// importing libraries
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const connectDB = require('./db');
connectDB();

const PORT = process.env.PORT || 5000;

// importing the routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// middleware
app.use(cors());
app.use(express.json());


// default route
app.get('/',(req,res)=>{
    if(mongoose.connection.readyState === 1){
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'Payment Gateway',
            "database": "Connected to MongoDb"
        }])
    }
    else{
        res.status(200).json([{
            "status": "success",
            "code": 200,
            "message": 'Payment Gateway',
            "database": "Not connected to MongoDb"
        }])
    }
    
})


// using the routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', transactionRoutes);


// listening to the server

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;