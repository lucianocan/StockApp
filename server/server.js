require("dotenv").config()
const express = require('express');
const router = require("./routes/index.js")
const cors = require('cors');

const app = express();
app.use(express.json());

const START = (port) => {
    app.use(cors());
    app.use("/api", router)
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    return app;
}
module.exports = START;