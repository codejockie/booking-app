import { json, urlencoded } from "body-parser";
import express = require("express");

import { routes } from "./routes";

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(urlencoded({ extended: true }));
app.use(json());

// Enable CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure routes
routes(router);
app.use("/", router);

app.get("/", (req, res) => {
  res.send("The sedulous hyena ate the antelope!");
});

app.listen(PORT);

export default app;
