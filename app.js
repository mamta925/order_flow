const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");
const config = require("config");
const port = config.get("port");
let router = express.Router();

//This will create the Database via automation if it doesn't exist in mysql'
require("./db/connect");

// Export app for other routes to use
let app = express();
let library = require("./routes")(app, router);
app.use(
  bodyParser.urlencoded({
    // Middleware
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/v1", library);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
