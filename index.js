const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const authRoute = require("./routes/auth");
const setupSocketIO = require("./socket/socket");
const protectedRoutes = require("./routes/protectedRoutes");

const PORT = process.env.PORT;

const corsOptions = {
  origin: "*",
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", authRoute);
app.use("/protected", protectedRoutes);

app.get("/", (req, res) => {
  console.log(req)
  res.send("Greetings from CodeLab!!!")
})

const server = http.createServer(app);
setupSocketIO(server);

server.listen(PORT, () => {
  console.log(`Server started`);
});
