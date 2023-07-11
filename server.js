

require("dotenv").config();
const http = require("http")
const app = require("./App")


const server = http.createServer(app)


server.listen(process.env.PORT, () => {
    console.log(`Server is running... with port No ${process.env.PORT}`);
});
