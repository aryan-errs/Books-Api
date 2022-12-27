const express = require('express');
const app = express();
const port  = process.env.port || 3000;
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/books-data', {
    useNewurlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("DataBase Connected!");
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes)

app.get('/', (req,res) => {
    res.send("App is running!");
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});