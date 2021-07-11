import {Schema, model, Document} from 'mongoose';

export interface IUserDocument extends Document {
	email: string;
	username: string;
	password: string;
	role: string;
	jwt?: string;
}


const schema = new Schema<IUserDocument>({
	'username' : {type: String, required: true},
	'email' : {type: String, required: true},
	'password' : {type: String, required: true},
	'role' : {type: String, required: true},
	'jwt' : String,
});

export default model<IUserDocument>('user', schema);
