const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoutes = require("./routers/school.routes");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/", schoolRoutes);
// console.log({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
