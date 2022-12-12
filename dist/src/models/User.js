import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});
export const User = mongoose.model('users', userSchema);
//# sourceMappingURL=User.js.map