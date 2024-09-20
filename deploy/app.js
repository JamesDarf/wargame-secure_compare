const express = require("express");
const path = require('path');
const fs = require("fs");
const secureCompare = require('secure-compare');
const bodyParser = require('body-parser')


const app = express();
const jsonParser = bodyParser.json();


const PORT = 3000; // port 3000



app.set('views', path.join(__dirname, '/static/views'));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render('index')
})

// 정적 파일 제공
app.use('/static', express.static(path.join(__dirname, 'static')));


app.post('/login', jsonParser, (req, res) => {
    console.log(req.body)
    const { username , password } = req.body
    const serverPassword = req.headers['x-server-password']

    // please, Don't try Brute forcing!!!
    setTimeout(() => {
        if (password == serverPassword) {
            return res.send('Do not hacking!!!!')
        }
        if (secureCompare(serverPassword, password) == true) { // password 변경해주세요. (password 값이 password임.)
            
        // flag is here!!!!!!
        try {
            const flag = fs.readFileSync('flag.txt', {encoding: 'utf8', flag: 'r'})
            const ip = req.header["x-forwarded-for"] || req.connection.remoteAddress
            fs.writeFileSync('./server.log', `${ip} | ${password}`, {flags: 'a'})
            return res.send(`flag is ${flag}`)
        } catch (error) {
            console.log(error)
            return res.send('Internal Server Error')
        }
        
        } else {
            return res.send('Wrong!')
        }
    }, 5000)
})


app.listen(PORT, () => { 
    console.log("Start")
})

