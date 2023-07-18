
require("dotenv").config();
const http = require("http");
const app = require("./App");

const IP_ADDRESS = process.env.IP; // Replace 'your_static_ip' with your actual static IP address
const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running at http://${IP_ADDRESS}:${PORT}/`);
});

