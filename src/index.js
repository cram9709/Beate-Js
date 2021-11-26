require('dotenv').config();
require('./db/db');
const express = require('express');
const cors = require('cors')
const expressJwt = require('express-jwt');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(
    expressJwt({
        secret: process.env.secret,
        algorithms: ['HS256'],
        requestProperty : process.env.requestProperty
    }).unless({
        path: ['/login', '/registro']
    })
);

app.use('/registro', require('./usuarios/registro'))
app.use('/login', require('./usuarios/login'));
app.use('/user', require('./usuarios'));
app.use('/perfiles', require('./profile/profile.view'));
app.use('/tracks', require('./tracks'));
app.use('/album', require('./album'));
app.use('/playlist', require('./playlist'));

app.listen(PORT, () => {
    console.log("Corriento puerto " + PORT);
})

