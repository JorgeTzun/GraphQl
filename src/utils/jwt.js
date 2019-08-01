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
    console.log(req);
    let Authorization = req.headers.authorization;

    if (!Authorization) {
        return req;
    } else {
        const formToken = Authorization.replace('JWT ',"");
        const payload=  jwt.verify(formToken, process.env.SECRET);
        if(!payload) return req;
        const user =  User.findOne({_id : payload.id});
        if(!user) return req;
        return {... req,user}
    }
}

module.exports = { createToken, verifyToken };