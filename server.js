require("dotenv").config();
const express = require("express");
const api_route = require("./routes/api_route");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb://localhost:27017/authapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const app = express();

app.use(cors());

app.use("/api", express.json(), api_route);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
