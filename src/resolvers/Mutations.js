const Empresa = require('../Models/Empresa');
const User = require('../Models/User');

const createEmpresa = async (root, args) => {
    let newEmpresa = new Empresa({
        ...args.data
    });
    const empresa = await newEmpresa.save().populate('user');
    const s = Empresa.findOne({_id: empresa.id}).populate('user');

    return empresa;
}

const createUser = async (root, args) => {
    let newUser = new User({
        ...args.data
    });
    const user = await newUser.save();
    return user;
}

module.exports = {
    createEmpresa,
    createUser
}