import mongoose  from 'mongoose';

const numDef = {
    type: Number,
    default: 0
}

const userSlWalletsSchema = new mongoose.Schema({
    _id: String,
    nickname: String,
    ignoreDNT: Boolean,
    toggleHint: Boolean,
    wallet: numDef

    })

const SlDB = mongoose.connection.useDb('goldlegends');
const UserSlWallets = SlDB.model('wallets', userSlWalletsSchema, 'wallets')

export default UserSlWallets