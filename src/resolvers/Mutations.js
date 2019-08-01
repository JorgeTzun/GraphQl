const Empresa = require('../Models/Empresa');
const User = require('../Models/User');
const authenticated  =  require('../utils/authenticated');
const storage  = require('../utils/storage');

const createEmpresa = async (root, args) => {
    let newEmpresa = new Empresa({
        ...args.data
    });
    const empresa = await newEmpresa.save();
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

const login  =   async (root, args) => {
    const token = await authenticated(args)
    .catch((err) => new Error(err));
    return {
        token,
        message: 'ok'
    };
}

const addPhoto  = async(root, args) => {
    console.log(args);

    if(args.photo){
        const  {createReadStream } = await args.photo;
        const stream  =  createReadStream();
        console.log('Stream ==>' , stream);
        const url = await storage({stream});
        console.log(url);;
    }
}


module.exports = {
    createEmpresa,
    createUser,
    login,
    addPhoto
}