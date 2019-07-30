const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Empresa  = new Schema({
    name: {type:String, required: true},
    address:  {type:String, required: true},
    createdAt: { type: Date, default: Date.now},
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('empresa', Empresa);