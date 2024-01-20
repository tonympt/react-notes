require('dotenv').config();
const http = require('http');
const app = require('./api/index');
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);