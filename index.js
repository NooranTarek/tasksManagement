import express from 'express'
import dotenv from "dotenv";
import { dbConnection } from './database/dbConnection.js';
dotenv.config();
const app = express()
const port = 3000
app.use(express.json());

dbConnection();

app.use((error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';
  
    if (error.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(error.errors).map(err => err.message).join(', ');
    }
  
    if (error.code && error.code === 11000) {
      statusCode = 400;
      const field = Object.keys(error.keyValue);
      message = `${field} already exists.`;
    }
  
     return res.status(statusCode).json(message);
  });
  
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))