import mongoose, { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [8, 'Minimum password length is 8 characters']
    }
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
export const User = mongoose.model('users', userSchema);
//# sourceMappingURL=User.js.map