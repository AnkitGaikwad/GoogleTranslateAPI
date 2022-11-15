const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use('/api/v1/', apiRouter);

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});