const express = require("express");
require("express-async-errors");
const router = require("./routes");
const app = express();

const routes = require("./routes");
app.use(express.json());
app.use(routes);

// Middleware
app.use((error, req, res, next) => {
  console.log("Handler de Erro:");
  console.log(error.message);
  res.status(500).json({ message: "Ocorreu um erro no servidor!" });
});

const port = 3000;
app.listen(port, () => console.log("listening on port " + port));
