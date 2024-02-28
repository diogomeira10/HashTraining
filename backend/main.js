require("dotenv").config();
const connectToDatabase = require('./src/db/db');
const express = require("express");
const app = express();
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post")
const friendsRoutes = require("./src/routes/friends")

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use("/api", friendsRoutes)

connectToDatabase().then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
  });
}).catch((error) => {
  console.error("Error connecting to database:", error);
});
