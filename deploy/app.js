const express = require("express");
const path = require('path');
const fs = require("fs");
const compare = require('secure-compare');
const bodyParser = require('body-parser')


const app = express();
const jsonParser = bodyParser.json();

const PORT = 3000; // port 3000

app.set('views', path.join(__dirname, '/static/views'));
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('index')
})


app.post('/login', jsonParser, (req, res) => {
    console.log(req.body)
    const { username , password } = req.body

    if (compare('password', password) == true) { // password 값이 password임.
        // res.send(fs.readFileSync('flag.txt'))
        res.send('FLAG')
    } else {
        res.send('Wrong!')
    }
})



app.listen(PORT, () => { // express run....
    console.log("Start")
})