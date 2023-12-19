const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    note: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }
    
    /*email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }*/
});

const User = mongoose.model("users", userSchema);

module.exports = User;