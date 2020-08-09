const express = require("express");
const server = express();
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require("./pages");
const nunjucks = require("nunjucks");

// configure nunjucks
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server
    // configure static files
    .use(express.static("public"))
    // receive data in req.body
    .use(express.urlencoded({ extended: true }))
    // routes 
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/success", saveClasses)

    .listen(5500);