import mongoose, {Schema} from "mongoose";
import * as bcrypt from 'bcrypt'
import {IUser} from "../types/IUser.js";
import {IUserModel} from "../types/IUserModel.js";
import {IUserDocument} from "../types/IUserDocument.js";


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
})

userSchema.pre('save', async function (this: IUser, next: any) {
    const salt = await bcrypt.genSalt()
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, salt)

    next()
})


userSchema.statics.login = async function (email: string, password: string) {
    const user = await this.findOne({email})

    if (user) {
        const authorized = await bcrypt.compare(password, user.hashedPassword)
        if (authorized) {
            return user
        }
        throw Error('Incorrect Password')
    }

    throw Error('Incorrect Email')

}


export const User = mongoose.model<IUserDocument, IUserModel>('users', userSchema)
