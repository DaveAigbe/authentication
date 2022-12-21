import mongoose, { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
    },
    hashedPassword: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [8, 'Minimum password length is 8 characters']
    }
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt);
    next();
});
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const authorized = await bcrypt.compare(password, user.hashedPassword);
        if (authorized) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};
export const User = mongoose.model('users', userSchema);
//# sourceMappingURL=User.js.map