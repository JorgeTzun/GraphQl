const bcrypt  = require('bcrypt');
const User  =  require('../Models/User');
const {createToken} = require('./jwt');

const authenticated  = (args) => {
    return new Promise ((resolve, reject) => {
        let {email , password} = args.data;
        User.findOne({email})
        .then((user) => {
            if(!user) reject(new Error('El usuario no existe'));
            bcrypt.compare(password, user.password, (err, isvalid) =>{
                if(err) reject(new Error('Ocurrio un error'));
                //isvalid ?  resolve(console.log(user)) : reject(new Error('Credenciales'));
                isvalid ?  resolve(createToken(user)) : reject(new Error('Credenciales'));
            });
        })
        .catch((err) => reject(err))
    });
}
module.exports =  authenticated;

