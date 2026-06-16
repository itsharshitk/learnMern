const User = require("../models/user.model");

class UserRepository {

     async create(data){
         return User.create(data);
     }
 
     async findByEmail(email){
         return User.findOne({email});
     }
 
     async findById(id){
         return User.findById(id).select("-password -refreshToken").lean();
     }
 
     async findByIdWithToken(id){
         return User.findById(id).select("-password").lean();
     }
 
     async update(id, data){
         return User.findByIdAndUpdate(id, data,{new:true});
     }

}

module.exports = new UserRepository();