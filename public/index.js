const http = require('http');
const app = require('../src/app');
const server = http.createServer(app);
const port = process.env.PORT || 7000;
server.listen(port, ()=>{
    console.log(`Server listen on port ${port}`);
});