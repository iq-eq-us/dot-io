import mongoose from 'mongoose';

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

})

const userModel = mongoose.model('users',userSchema);

export default userModel