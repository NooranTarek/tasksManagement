import express from 'express'
import dotenv from "dotenv";
import { dbConnection } from './database/dbConnection.js';
dotenv.config();
const app = express()
const port = 3000
app.use(express.json());

dbConnection();
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))