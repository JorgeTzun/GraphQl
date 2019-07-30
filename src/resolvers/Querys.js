const Empresa = require('../Models/Empresa');

const getEmpresa = async (root, args) => {
    const empresa = await Empresa.findOne({ name: args.name });
    return empresa;
};

const getFilterEmpresa = async (root, args) => {
    const empresa = await Empresa.findOne({ name: { $regex: '.*' + args.name + '.*' } });
    return empresa;
};


const getAllEmpresa = async (root, args) => {
    //let empresa;
    const empresas = await Empresa.find({ name: args.name });
    return empresas;
}

module.exports = {
    getEmpresa,
    getFilterEmpresa,
    getAllEmpresa
};