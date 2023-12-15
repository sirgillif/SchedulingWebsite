const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: { type: ObjectId, ref: "Info" },
  appointments: [{ type: ObjectId, ref: "Appointment" }],
});

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", function(next){
    if(this.isModified("password")){
        bcrypt.genSalt(saltRounds, (err,salt)=>{
            if(err){next(err);return;}
            bcrypt.hash(this.password, salt, (err,hash)=>{
                if(err){next(err);return;}
                this.password = hash;
                next();
            });
        });
    }
    next();
});

module.exports = mongoose.model("User",userSchema);