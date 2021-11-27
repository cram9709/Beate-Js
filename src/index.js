require('dotenv').config();
require('./db/db');
require('./config');
const express = require('express');
const cors = require('cors')
const expressJwt = require('express-jwt');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// app.use(
//     expressJwt({
//         secret: process.env.secret,
//         algorithms: ['HS256'],
//         requestProperty : process.env.requestProperty
//     }).unless({
//         path: ['/login', '/registro']
//     })
// );

app.use('/register', require('./users/register'))
app.use('/login', require('./users/login'));
app.use('/user', require('./users'));
app.use('/profiles', require('./profile/profile.view'));
app.use('/tracks', require('./tracks'));
app.use('/album', require('./album'));
app.use('/playlist', require('./playlist'));

app.listen(PORT, () => {
    console.log("Corriento puerto " + PORT);
});

