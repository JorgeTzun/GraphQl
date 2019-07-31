const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt  =  require('bcrypt');

const User = new Schema({
     name: {type: String, required: true},
     email: {type: String, required: true},
     password: {type: String, required: true},
     img:{ type: String, default:''}
})

User.pre('save', function(next){
     const user =  this;
     console.log(user);
     const SAL_ROUNDS = 10;
     bcrypt.genSalt(SAL_ROUNDS, function (err, salt) {
          if(err) return next();
          bcrypt.hash(user.password, salt, function (err, hash) {
               if(err) return next();
               user.password  =  hash;
               console.log(user);
               return next();       
          });
      });
})

module.exports  = mongoose.model('user',User);