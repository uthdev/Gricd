import express, { Application } from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';

import { authRoutes, bookRoutes, categoryRoutes } from './routes'
import errorMiddleware from "./middleware/error.middleware";
import connect from "./connections/init_mongodb";
import client from './connections/init_redis'


dotenv.config();
connect();
client
const PORT = process.env.PORT || 5000;
const app: Application = express();

//helmet
app.use(helmet());


//logger
app.use(logger('dev'));

const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));

// Body parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cookieParser
app.use(cookieParser());

//app


app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);
app.use('/*', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Gricd API',
  });
});

app.use(errorMiddleware)

app.listen(PORT, async() => {
  console.log(`Server started on port ${PORT}`)
})

export default app;