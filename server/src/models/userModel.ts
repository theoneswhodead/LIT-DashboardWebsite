import mongoose, { Model } from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt'


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


userSchema.statics.signup = async function(username: string, email: string, password: string) {

    if(!username || !email || !password) {
        throw Error('Wszystkie pola są wymagane!')
    }

    if(!validator.isEmail(email)) {
        throw Error('Podany adres E-mail nie jest poprawny!')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe!')
    }

    const existUsername = await this.findOne({username})
    const existEmail = await this.findOne({email})

    if(existUsername) {
        throw Error('Ten username jest w użyciu')
    }

    if(existEmail) {
        throw Error('Ten E-mail jest w użyciu')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash})

    return user
}

interface UserSignup extends Model<any> {
    signup(username: string, email: string, password: string): Promise<any>;
}

const User = mongoose.model<any, UserSignup>("user", userSchema);

export default User;