import { mongoose } from 'mongoose'


const Schema = mongoose.Schema

const strReqUni = {
    type: String,
    required: true,
    unique: true
}

const userSchema = new Schema({
    username: strReqUni,
    email: strReqUni,
    password: strReqUni
})
