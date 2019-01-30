import mongoose from 'mongoose';

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    active: Boolean,
    createdAt: { type : Date, default: Date.now },
    updatedAt: { type : Date, default: null },
    updatedBy: String,
})
module.exports = mongoose.model('user', userSchema, 'users' )