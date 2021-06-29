const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');

const connectDB = require('./config/db')

dotenv.config({ path: './.env' })

connectDB()

const server = express();

const PORT = 3333

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(PORT, console.log('Server running on port 3333'));