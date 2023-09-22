import mongoose, { Model, Document } from 'mongoose';
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
export interface UserDoc extends mongoose.Document {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    required: true,
    unique: true
    }
}

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

userSchema.statics.login = async function(email: string, password: string){

    if(!email || !password) {
        throw Error('Wszystkie pola są wymagane!')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Niepoprawne dane logowania')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword) {
        throw Error('Niepoprawne dane logowania')
    }

    return user
}

userSchema.statics.forgot = async function(email: string){

    if(!email) {
        throw Error('Pole Email jest wymagane!')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Niepoprawne dane logowania')
    }

    return user
}

userSchema.statics.resetPassword = async function(id: string, username: string, email: string, password: string) {

    if(!username || !email || !password) {
        throw Error('Wszystkie pola są wymagane!')
    }

    if(!validator.isEmail(email)) {
        throw Error('Podany adres E-mail nie jest poprawny!')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.findByIdAndUpdate(id, { password: hash }, { new: true })

    return user
}

userSchema.statics.updateCredentials = async function(id: string, username?: string, email?: string, password?: string ) {
    console.log('static updateCredentials ', )
    if (!id) {
        throw Error('Błąd autoryzacji')
    }

    if (email && !validator.isEmail(email)) {
        throw Error('Podany adres E-mail nie jest poprawny!')
    }

    if (password && !validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe!')
    }


    if (username) {
        const existUsername = await this.findOne({ username: username })
        if (existUsername) {
            throw Error('Ten username jest w użyciu')
        }
    }

    if (email) {
        const existEmail = await this.findOne({ email: email })
        if (existEmail) {
            throw Error('Ten E-mail jest w użyciu')
        }
    }

    const updateFields: { [key: string]: string } = {};
   

    if (username) {
        updateFields.username = username;
    }
    if (email) {
        updateFields.email = email;
    }
    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        updateFields.password = hash;
    }
    const user = await this.findByIdAndUpdate(id, updateFields, { new: true });

    return user
}

interface UserStatics extends Model<UserDoc> {
    signup(username: string, email: string, password: string): Promise<UserDoc>;
    login(email: string, password: string): Promise<UserDoc>;
    forgot(email: string): Promise<UserDoc>;
    resetPassword(id: string, username: string, email: string, password: string): Promise<UserDoc>;
    updateCredentials(id: string, username: string, email: string, password: string): Promise<UserDoc>;
  }
  
  const User = mongoose.model<UserDoc, UserStatics>('user', userSchema);
  
  export default User;