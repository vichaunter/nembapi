import { Document, Schema, model } from 'mongoose';

export interface IExample extends Document {
	name: String,
	year: Date
}

const schema = new Schema<IExample>({
	'name' : {type: String, required: true},
	'year' : {type: Date, required: true}
});

export default model<IExample>('example', schema);
