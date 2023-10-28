import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

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


const serverSlOverviewSchema = new Schema({
    _id: String,
    nickname: strReq,
    ip: strReq,
    xp: numDef,
    gold: numDef,
    ignoreDNT: Boolean,
    dntEnabled: Boolean,
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
    level: numDef,
    kdRatio: numDef,
    accuracy: String,
    headshotPercentage: String,
    })


const DiscordDB = mongoose.connection.useDb('scprp');
const ServerSlOverview = DiscordDB.model('players', serverSlOverviewSchema)

export default ServerSlOverview