const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRouter = require('../routes/users.route');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/user', userRouter);

server.get('/', (req, res) => {
  res.status(200).json({message: "It's alive!"});
});

module.exports = server;
