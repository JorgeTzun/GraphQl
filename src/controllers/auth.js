const mongoose = require('../config/conexion')
const bcrypt = require('bcrypt');
const { generaToken } = require('../services/jwt');
const { user } = require('../models/user'); // Se importa el modelo, las llaves  nos permite un acceso mas rápido
const saltRounds = 10;

exports.login = (req, res) => {

    let params = req.body;
    console.log(params);

    if (params.email && params.password) {

        //Validmos si existe el  usuario
        user.findOne({ email: params.email }, (errfind, user) => {
            if (errfind) {
                res.status(500).json({ message: `Ocurrió un error: ${errfind}` });
            }
            else if (user !== null) {
                bcrypt.compare(params.password, user.password, function (errcompare, valido) {
                    if (errcompare) {
                        res.status(500).json({ message: `Ocurrió un error: ${errcompare}` });
                    }
                    else if (valido) {
                        user.password = ':)';
                        let token = generaToken({ name: user.name, email: user.email });
                        res.status(200).json({ status: 'ok', data: user, token: token, message: `Bienvenido ${user.name}` });
                    }
                    else {
                        res.status(404).json({ message: 'El email o password son incorrectos.' });
                    }
                });
            }
            else {
                res.status(404).json({ message: 'El email no está registrado en el sistema.' });
            }
        });
    }
    else {
        res.status(400).json({ message: 'Es necesario ingresar un email y password' });
    }
};

exports.register = (req, res) => {

    let params = req.body;
    console.log(params);

    if (params.name && params.email && params.password) {

        //Validmos si existe el  usuario
        user.findOne({ email: params.email }, (err, respuesta) => {
            if (err) {
                res.status(500).json({ message: 'Ocurrio un Error' });
            }
            else if (respuesta !== null) {
                res.status(200).json({ message: `El correo ${params.email} ya está en uso` });
            }
            else {

                //let hash  = encrypt(params.password);
                //console.log(`Password generado ${hash}`);

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(params.password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        //Se crea un nuevo modelo
                        let newUser = user({
                            name: params.name,
                            email: params.email,
                            password: hash
                        });

                        //Se ejecuta el guardado del modelo
                        newUser.save((err, savedObject) => {
                            if (err) { //Si ocurre algún error se envía 
                                res.status(500).send(err);
                            }
                            else {
                                res.send(savedObject);
                            }
                        });
                    });
                });
            }
        });
    }
    else {
        res.status(400).json({ message: 'Sin datos' });
    }
};