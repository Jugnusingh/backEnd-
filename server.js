require("dotenv").config();
const https = require("http"); // Use 'http' instead of 'https'
const app = require("./App");

const IP_ADDRESS = process.env.IP; // Replace 'your_static_ip' with your actual static IP address
const PORT = process.env.PORT;

const server = https.createServer(app); // Use 'http.createServer' instead of 'https.createServer'

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running at http://${IP_ADDRESS}:${PORT}/`);
});
