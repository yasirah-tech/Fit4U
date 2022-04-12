//import
const express = require("express");
const cors = require("cors");
const db = require("./db/db");

//start server 
const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(cors());

//endpoints
app.get('/', (req, res) => {
    res.render('index');
});

//configure port
const PORT = process.env.PORT || 8000;

//listen to port
app.listen(PORT, () => {
    console.log('listening on port 8000');
});