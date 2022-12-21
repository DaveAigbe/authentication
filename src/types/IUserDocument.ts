import {Document} from 'mongoose'
import {IUser} from "./IUser.js";

export interface IUserDocument extends IUser, Document {

}
