const express = require('express');

const app = express();

//setting
app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send(`Estas en https://mrpeanutbotter.appspot.com/ y el Bot está working joia, ahora solo relax :)`);
});

module.exports = app;