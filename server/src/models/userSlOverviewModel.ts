import mongoose  from 'mongoose';


const strReqUniq = {
    type: String,
    require: true,
    unique: true, 
}

const strReq = {
    type: String,
    require: true,
}
const numDef = {
    type: Number,
    default: 0
}

const dailyStats = new mongoose.Schema({
    lastJoin: Date,
    _id: String,
    timesJumped: numDef,
    onlineTime: numDef,
    deaths: numDef,
    kills: numDef,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    kdRatio: numDef,
    accuracy: String,
    headshotPercentage: String
})


const userSlOverviewSchema = new mongoose.Schema({
    _id: String,
    nickname: String,
    ip: String,
    ignoreDNT: Boolean,
    dntEnabled: Boolean,
    dailyStats: [dailyStats],
    kills: numDef,
    deaths: numDef,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    enteredPocket: numDef,
    escapedPocket: numDef,
    timesJumped: numDef,
    caughtInPocket: numDef,
    onlineTime: numDef,
    firstJoined: Date,
    lastSeen: Date,
    specificKills: Object,
    specyficDeaths: Object,
    kdRatio: numDef,
    accuracy: String,
    headshotPercentage: String
    })

const SlDB = mongoose.connection.useDb('goldlegends_beta_testing_fix');
const UserSlOverview = SlDB.model('players', userSlOverviewSchema, 'players')

export default UserSlOverview