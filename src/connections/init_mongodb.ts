import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()

const MONGO_URI = <string>process.env.MONGO_URI;

export default async () => {
  
  const connect = async () => {
    try {
      await mongoose.connect(MONGO_URI);  
      return console.info(`Successfully connected to database`);
    } catch (error) {
      console.error('Error connecting to database: ', error);
      return process.exit(1);  
    }
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

(async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Successfully connected to database');

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection disconnected');
  });
})()
