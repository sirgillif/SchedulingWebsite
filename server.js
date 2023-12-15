const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const cors = require("cors");
const port = require("./config/config").port;
const router = require("./routes/");
const dbConnect = require("./config/database");

let app = express();

dbConnect()
  .then(() => {
    app.use(cors());
    app.use(express.static("static"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.engine(
      "hbs",
      handlebars.engine({
        extname: "hbs",
      })
    );
    app.set("view engine", "hbs");

    app.use("/", router.view);
    app.use("/api", router.api);

    app.listen(port, () => {
      console.log(`Running on ${port}`);
    });
  })
  .catch((error) => console.log(error));
