const express = require("express");
const app = express();

// --- Middlewares ---

app.use((req, res, next) => {
  console.log("Hi, I am the first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("This is the second middleware");
  next();
});

// Logger Middleware
app.use((req, res, next) => {
  req.time = new Date().toString();
  console.log(`${req.method} ${req.host}${req.path} at ${req.time}`);
  next();
});

// Token-based Access Middleware for /api routes
app.use("/api", (req, res, next) => {
  const { token } = req.query;
  if (token === "giveaccess") {
    return next();
  }
  return res.status(401).send("Access Denied");
});

// --- Routes ---

app.get("/", (req, res) => {
  res.send("This is the root page");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

app.get("/api", (req, res) => {
  res.send("Data from API");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start Server
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
