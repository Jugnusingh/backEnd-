require("dotenv").config();
const https = require("https");
const fs = require("fs");
const app = require("./App");

const IP_ADDRESS = process.env.IP; // Replace 'your_static_ip' with your actual static IP address
const PORT = process.env.PORT;

// Paths to SSL certificate and private key files obtained from Certbot
const certificatePath = "/etc/letsencrypt/live/waveart.in/fullchain.pem";
const privateKeyPath = "/etc/letsencrypt/live/waveart.in/privkey.pem"; // Corrected the file name here
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const certificate = fs.readFileSync(certificatePath, "utf8");

const credentials = {
  key: privateKey,
  cert: certificate,
};

const server = https.createServer(credentials, app);

server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server is running at https://${IP_ADDRESS}:${PORT}/`);
});
