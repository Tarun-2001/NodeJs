const express = require("express");
const dotenv = require("dotenv").config();
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

const { dbConnection } = require("./Db_Connection");
const auth = require("../Jobs/routs/auth");
const jobs = require("../Jobs/routs/jobs");
const { error } = require("./middleware/error-handle");
const { protect } = require("./middleware/authentication");
const port = 5000 || process.env.PORT;
const app = express();
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/auth", auth);
app.use("/api/job", protect, jobs);
app.use(error);

app.listen(port, async () => {
  dbConnection(process.env.MONGOURL);
  console.log("Server Started sucessufully");
});
