const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        avatar: {
            url: String,
            publicId: String,
            size: Number,
            width: Number,
            height: Number
        },

        isVerified: {
            type: Boolean,
            default:false
        },

        refreshToken: String,
        
        verificationToken: String,

        resetPasswordToken: String,
        
        resetPasswordExpire: Date

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(){
    
    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}



module.exports = mongoose.model("User", userSchema);