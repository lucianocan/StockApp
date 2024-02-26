require("dotenv").config();
require('express');
const log = require("./lib/log.js");
const { Connection } = require("./models/db.js");
const START = require("./server.js");

// const server = require("./server.js");
const PORT = process.env.PORT;
const init = async ()=> {
    try {
        log.info("App", "Starting App...");
        log.info("App", `Process iD ${process.pid}`);
        await Connection.open(process.env.MONGODB_URL, process.env.MONGODB_DB);
        await START(PORT);
    } catch (error) {
        console.log(error);
    } 
}
init()