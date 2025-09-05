import { Schema, model } from 'mongoose';

const urlSchema = Schema({
    shortId: { type: String, required: true, unique: true },
    redirectURL: { type: String, required: true },
    visitHistory: [{ timeStamp: { type: Number } }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'users'}
}
    , { timestamps: true });

const URL = model('URL', urlSchema);

export default URL;   