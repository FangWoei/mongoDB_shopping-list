const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();

app.use(express.json());
// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://fangwoei22f:NJCRzIpQAyQmgwm1@cluster0.2j4w95k.mongodb.net/shoppinglist"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const shoppingRouter = require("./routes/items.js");


app.use("/items", shoppingRouter);

app.get("/", (req, res) => {
  res.send(
    "<button><a href='/items'>Shopping</a></button>"
  );
});

// start the server
app.listen(1204, () => {
  console.log("Server is running at http://localhost:1204");
});
