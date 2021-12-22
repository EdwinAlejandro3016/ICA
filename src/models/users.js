const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    nombre: {type: String},
    password: {type: String}
});

userSchema.methods.encryptPassword = async(password)=>{ 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
};

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const user = mongoose.model('User',userSchema);

module.exports = user;