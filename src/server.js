const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

// configure nunjucks
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "111111111",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: 20,
        weekday: "0",
        time_from: 720,
        time_to: 1520
    },
    {
        name: "Emanuel Massafera",
        avatar: "https://avatars1.githubusercontent.com/u/65625500?s=460&u=eb9e300de61698fc8531949a451ce2f0e9da46f9&v=4",
        whatsapp: "111111111",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: 20,
        weekday: "0",
        time_from: 720,
        time_to: 1520
    }
];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
];

function getSubject (subjectNumber) {
    const position = +subjectNumber - 1;

    return subjects[position];
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query;

    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query;
    const isNotEmpty = Object.keys(data).length != 0;

    if (isNotEmpty){

        data.subject = getSubject(data.subject);
        
        proffys.push(data);

        return res.redirect("/study");
    }

    return res.render("give-classes.html", { subjects, weekdays });
}


server
    // configure static files
    .use(express.static("public"))
    // routes
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)

    .listen(5500);