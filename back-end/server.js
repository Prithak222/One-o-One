import express from "express";
const app = express();

app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("Server is running, Prithak!");
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
