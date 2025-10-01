const mongoose = require('mongoose'); 
require('dotenv').config(); 
const logger = require('../utils/logger');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('Database Connected')
    }catch(error){
        logger.error('Database not Connected', error)
    } 
}; 

module.exports = connectDB;