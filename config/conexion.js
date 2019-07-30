const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, (err, db) => {
    if(!err){
        console.log('MONGODB conectado correctamente');
    }
});