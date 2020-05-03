const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const multer  = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname) 
    }
});

let destination = multer({ storage: storage });


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.post('/upload', destination.any('file'), function (req, res, next) {
    //console.log(req.form);
    res.send("File upload sucessfully.");
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);