const express = require('express');
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5050;
const auth = require('./middleware/auth.js');
require('./db/connections');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/submission', require('./routes/submission'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.post('/auth_test', auth, async (req, res) => {
    res.send("Auth test passed");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
}
);
