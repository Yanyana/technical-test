const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./utils/error-handler");
const { PORT, MONGODB_URL } = require("./config")

//SETUP SERVER
const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(express.json());

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log("success connect to " + MONGODB_URL);
    } else {
        console.log(err)
        console.log("connection to database failed " + MONGODB_URL);
    }
});

// Route
app.use("/api/v1", require("./routes"));
app.use("/", errorHandler);

app.listen(PORT);
console.log(`Server listening at port: ` + PORT);