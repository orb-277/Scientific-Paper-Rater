const express = require('express');
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = 5050;



app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.get('/submitted', (req, res) => {
    res.send('Submitted!');
    }
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    }
);
