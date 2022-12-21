import {Model} from 'mongoose';
import {IUserDocument} from "./IUserDocument.js";

export interface IUserModel extends Model<IUserDocument> {
    login: (username: string, password: string) => IUserDocument;
}
