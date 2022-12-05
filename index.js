const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const readline = require('readline');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

var readDate = fs.readFileSync(__dirname + '/date.txt', 'utf-8');
console.log(readDate);
const d = new Date();
const dateNow = d.toDateString();
function writeData(text) {
    fs.appendFile(__dirname + '/number.txt', text + "\n", function (err) {
        if (err) throw err;
        console.log('IS WRITTEN')
    });
}
if (dateNow != readDate) {
    fs.writeFileSync('date.txt', dateNow);
    const number1 = String(Math.floor(Math.random() * 9000 + 1000));
    const number2 = String(Math.floor(Math.random() * 9000 + 1000));
    const number3 = String(Math.floor(Math.random() * 9000 + 1000));
    const number4 = String(Math.floor(Math.random() * 9000 + 1000));
    fs.writeFileSync(__dirname + '/number.txt', number1 + "\n");
    writeData(number2);
    writeData(number3);
    writeData(number4);
}
const readNumber = readline.createInterface({
    input: fs.createReadStream(__dirname + '/number.txt'),
    output: process.stdout,
    terminal: false
});
const array = [];
var i = 0;
readNumber.on('line', (line) => {
    array[i] = line;
    i++;
});
const datefordisplay = d.toDateString();
app.get('/', function (req, res) {
    res.render("index", { value1: array[0], value2: array[1], value3: array[2], value4: array[3], date: datefordisplay })
})



app.listen(process.env.PORT || 3000, function () {
    console.log("server started suuccessfully");
})
