const jwt = require('jsonwebtoken');

exports.verifyTkn = (req, res, next) =>
{
    console.log('verifica token');
    console.log(req);
    let cToken = req.headers['authorization'];

    if (!cToken)
        res.status(401).send({ error: 'En necesario el token de autentificación' });

    cToken = cToken.replace('Bearer');

    jwt.verify(cToken, process.env.SECRET, (err, decode) =>{
         if(err){
             res.status(500).json({message: 'Ocurrió un error', err});
         }
         else{
             //Cuando el token es correcto
             next();
         }
    });
}