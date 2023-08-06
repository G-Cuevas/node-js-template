
const http = require('http');


const port = 1324;

http.createServer((req, res) => {

    res.write('Hello from the server!');
    red.end();

})
.listen(port);

console.log(`Server is listening on port ${port}`);