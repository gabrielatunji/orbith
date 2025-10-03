import mongoose from 'mongoose';
import logger from '../utils/logger';
import { configDotenv } from 'dotenv'; 
configDotenv();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!); // Use the non-null assertion operator (!)
    logger.info('Database Connected');
  } catch (error: any) {
    logger.error('Database not Connected', error);
  }
};

export default connectDB;