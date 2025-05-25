const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoutes = require("./routers/school.routes");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
