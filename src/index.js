require('dotenv').config();
const {GraphQLServer} = require ('graphql-yoga');
const {importSchema} = require('graphql-import');
const mongoose = require('../config/conexion');
const typeDefs  =  importSchema('./src/schema.graphql');
const {getAllEmpresa, getFilterEmpresa, getEmpresa} =  require('../src/resolvers/Querys');
const {createEmpresa, createUser} =  require('../src/resolvers/Mutations');


 const resolvers = {
     Query:{
        getAllEmpresa,
        getFilterEmpresa,
        getEmpresa
     },
     Mutation:{
        createEmpresa,
        createUser
     }
}

const server = new GraphQLServer({ typeDefs, resolvers})
server.start(() => console.log('Server is running on localhost:4000'))