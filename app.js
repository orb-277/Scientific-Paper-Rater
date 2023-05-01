const express = require('express');
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5050;
require('./db/connections');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/submission', require('./routes/submission'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/home', require('./routes/home'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
}
);
