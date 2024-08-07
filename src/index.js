const express = require("express");
const router = require("./routes");
const app = express();

const routes = require("./routes");
app.use(express.json());

// Middleware
app.use((request, response, next) => {
  next();
});

app.use(routes);

const port = 3000;
app.listen(port, () => console.log("listening on port " + port));
