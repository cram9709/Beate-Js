require('dotenv').config();
const mongoose = require('mongoose');

(async ()=> {
    const db = await mongoose.connect(process.env.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Conectado a mongo');
})();