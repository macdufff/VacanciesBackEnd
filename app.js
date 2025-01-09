const express = require("express");
const app = express();
const cors = require("cors");
const djin = require("./routes/djiin");
const dou = require("./routes/dou");
const workua = require("./routes/workua");
app.use(express.json());
app.use(cors());

app.use("/api/djin", djin);
app.use("/api/dou", dou);
app.use("/api/workua", workua);


app.listen(1001, () => {
  console.log("Server Started");
});
