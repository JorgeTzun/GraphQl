require('dotenv').config();
const {GraphQLServer} = require ('graphql-yoga');
const {importSchema} = require('graphql-import');
const mongoose = require('../config/conexion');
const AuthDirective =  require('./resolvers/directive')
const verifyToken  = require('./utils/jwt');
const typeDefs  =  importSchema('./src/schema.graphql');
const { makeExecutableSchema } = require('graphql-tools');
const {getAllEmpresa, getFilterEmpresa, getEmpresa} =  require('../src/resolvers/Querys');
const {createEmpresa, createUser, login} =  require('../src/resolvers/Mutations');


 const resolvers = {
     Query:{
        getAllEmpresa,
        getFilterEmpresa,
        getEmpresa
     },
     Mutation:{
        createEmpresa,
        createUser,
        login
     }
}

const Schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
       auth: AuthDirective
    }
});

const server = new GraphQLServer({ typeDefs, resolvers})
server.start(() => console.log('Server is running on localhost:4000'))