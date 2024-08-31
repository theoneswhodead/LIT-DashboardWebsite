import mongoose, { Model } from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt'
import OTPAuth from "otpauth";

const Schema = mongoose.Schema

const strReqUni = {
    type: String,
    required: true,
    unique: true
}
const strUni = {
    type: String,
}

const userSchema = new Schema({
    username: strReqUni,
    email: strReqUni,
    password: strReqUni,
    enable2fa: Boolean,
    secret2fa: strUni,
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
    },
    enable2fa: Boolean,
    secret2fa: {
        type: String,
    }
}

userSchema.statics.signup = async function(username: string, email: string, password: string) {

    const secret2fa = ''
    const enable2fa = false

    if(!username || !email || !password) {
        throw Error('Wszystkie pola są wymagane!')
    }
    if (username) {

        const usernameRegex = /^[a-zA-Z0-9_]+$/; 
        if (!usernameRegex.test(username)) {
            throw Error('Nazwa użytkownika zawiera niedozwolone znaki!');
        }

        const existUsername = await this.findOne({ username: username })
        if (existUsername) {
            throw Error('Ten username jest w użyciu!')
        }
    }

    if(!validator.isEmail(email)) {
        throw Error('Podany adres E-mail nie jest poprawny!')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe!')
    }
    const existEmail = await this.findOne({email})

  
    if(existEmail) {
        throw Error('Ten E-mail jest w użyciu')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({username, email, password: hash, enable2fa, secret2fa})

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

userSchema.statics.resetPassword = async function(id: string, password: string) {

    if(!password) {
        throw Error('Wpisz nowe hasło')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const checkPasswordUser = await this.findOne({'_id': id})
    const matchPassword = await bcrypt.compare(password, checkPasswordUser.password)
    
    if(matchPassword) {
        throw Error('Nowe hasło nie może być takie samo jak poprzednie')
    }


    const user = await this.findByIdAndUpdate(id, { password: hash }, { new: true })

    return user
}

userSchema.statics.updateCredentials = async function(id: string, currentPassword: string, newUsername?: string, newEmail?: string, newPassword?: string) {

    if (!id) {
        throw Error('Błąd autoryzacji')
    }

    const checkPasswordUser = await this.findOne({'_id': id})

    const matchPassword = await bcrypt.compare(currentPassword, checkPasswordUser.password)

    if(!matchPassword) {
        throw Error('Niepoprawne dane logowania')
    }

    if(!newEmail && !newPassword && !newUsername) {
        throw Error('Uzupełnij wszystkie pola')
    }

    if (newEmail && !validator.isEmail(newEmail)) {
        throw Error('Podany adres E-mail nie jest poprawny!')
    }

    if (newPassword && !validator.isStrongPassword(newPassword)) {
        throw Error('Hasło jest za słabe!')
    }

    if (newUsername) {

        const usernameRegex = /^[a-zA-Z0-9_]+$/; 
        if (!usernameRegex.test(newUsername)) {
            throw Error('Nazwa użytkownika zawiera niedozwolone znaki!');
        }

        const existUsername = await this.findOne({ username: newUsername })
        if (existUsername) {
            throw Error('Ten username jest w użyciu!')
        }
    }

    if (newEmail) {
        const existEmail = await this.findOne({ email: newEmail })
        if (existEmail) {
            throw Error('Ten E-mail jest w użyciu!')
        }
    }

    const updateFields: { [key: string]: string } = {};
   
    if (newUsername) {
        updateFields.username = newUsername;
    }
    if (newEmail) {
        updateFields.email = newEmail;
    }
    if (newPassword) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)
        updateFields.password = hash;
    }
    const user = await this.findByIdAndUpdate(id, updateFields, { new: true });
    return user
}

userSchema.statics.verify2fa = async function(id: string, currentPassword: string, token: string) {

    if (!id) {
        throw Error('Błąd autoryzacji')
    }

    const user = await this.findOne({'_id': id})

    const matchPassword = await bcrypt.compare(currentPassword, user.password)

    if(!matchPassword) {
        throw Error('Niepoprawne dane logowania')
    }

    if(token.length > 6 || token.length < 6 ) {
        throw Error('Podaj poprawny kod')
    }

    let totp = new OTPAuth.TOTP({
        issuer: "https://www.goldenleague.pl",
        label: "GoldenLeague",
        algorithm: "SHA1",
        digits: 6,
        secret: user.secret2fa,
     });
    let delta = totp.validate( {token} );


    if(delta == 0) {

        await User.findOneAndUpdate({
            '_id': id,
        }, {
            $set: {
                 'enable2fa': true
            }
        })

        const user = await User.findOne({'_id': id})
        return user
      } else {
        throw Error('Nie poprawny kod')
      }
   

}
interface UserStatics extends Model<UserDoc> {
    signup(username: string, email: string, password: string): Promise<UserDoc>;
    login(email: string, password: string): Promise<UserDoc>;
    forgot(email: string): Promise<UserDoc>;
    resetPassword(id: string, password: string): Promise<UserDoc>;
    updateCredentials(id: string, newUsername: string, newEmail: string, newPassword: string, currentPassword: string): Promise<UserDoc>;
    verify2fa(id: string, currentPassword: string, code: string): Promise<UserDoc>;
  }
  
  const User = mongoose.model<UserDoc, UserStatics>('user', userSchema);
  
  export default User;