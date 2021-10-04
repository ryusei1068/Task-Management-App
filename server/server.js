const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors())

const login = require("./routing/login");
const logout = require("./routing/logout");

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', login);
app.delete('/logout', logout);

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})
