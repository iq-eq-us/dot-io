import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    otp: {
        type: String,
        required: true,
    }
})

const otpModel= mongoose.model('otp',otpSchema);

export default otpModel