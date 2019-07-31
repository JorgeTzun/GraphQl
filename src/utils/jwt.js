const jwt = require('jsonwebtoken');
const User  =  require('../Models/User');

const createToken = (user) => {
    console.log(user)
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' })
}

const verifyToken = (req) => {
    console.log('verifica token');
    console.log(req);
    let Authorization = req.get['Authorization'];

    if (!Authorization) {
        res.status(401).send({ error: 'En necesario el token de autentificación' });
    } else {
        const formToken = Authorization.replace('Bearer');
        const payload=  jwt.verify(formToken, process.env.SECRET);
        if(!payload) return req;
        const user =  User.findOne({_id : payload.id});

        return {... req,user}
    }
    return lTokenValido;
}

module.exports = { createToken, verifyToken };

/*const generaToken = (tokenData) => {

    return jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24  // Tiempo  en que expira el token : 1hr
    });
};

const verificaToken = (req, res) => {

    console.log('verifica token');
    console.log(req);
    let lTokenValido = true;
    let cToken = req.headers['authorization'];

    if (!cToken)
        res.status(401).send({ error: 'En necesario el token de autentificación' });

    cToken = cToken.replace('Bearer');

    jwt.verify(cToken, process.env.SECRET, (err, token) =>{
         if(err){
             lTokenValido = false;
             res.status(401).send({error: "Token inválido"});
         }
    });

    return lTokenValido;
}

module.exports =  generaToken */