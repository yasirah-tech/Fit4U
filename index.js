//import
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const db = require("./db/db");
const $ = require("jquery")
const jsdom = require("jsdom")

//start server 
const app = express();

//register view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//endpoints
app.get('/', (req, res) => {
    res.render('index');
});

app.use("/auth", require("./routes/jwtAuth"))
app.use("/home", require("./routes/home"))

//configure port
const PORT = process.env.PORT || 8000;

//listen to port
app.listen(PORT, () => {
    console.log('listening on port 8000');
});