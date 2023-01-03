const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 80;

const staticPath = path.join(__dirname, "../public");

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(staticPath));


app.get("/", (req, res) => {
    res.render("index");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/weather", (req, res) => {
    res.render("weather");
})

app.get("*", (req, res) => {
    res.status(404);
    res.render("error", {
        errMsg: "Opps! Page Not Found"
    });
})



app.listen(port, () => {
    console.log("listening...")
})