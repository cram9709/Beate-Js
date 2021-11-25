require('dotenv').config();
require('./db/db');
const express = require('express');
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.use('/registro', require('./usuarios/usuario.view'));
app.use('/perfiles', require('./profile/profile.view'));
app.use('/tracks', require('./tracks'))
app.use('/album', require('./album'))
app.use('/playlist', require('./playlist'))

app.listen(PORT, () =>{
    console.log("Corriento puerto "+ PORT);
})

