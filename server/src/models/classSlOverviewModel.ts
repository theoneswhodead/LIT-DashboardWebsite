import mongoose from 'mongoose';

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

const basicClass = new mongoose.Schema({
    _t: [],
    roleId: String,
    timesJumped: numDef,
    kills: numDef,
    deaths: numDef,
    timePlayed: numDef,
    lastPlayed: Date,
    kdRatio: numDef,
})

const humanClass = new mongoose.Schema({
    basicClass,
    firedShots: numDef,
    accurateShots: numDef,
    headshots: numDef,
    accuracy: String,
    headshotPercentage: String,
})

const escapistClass = new mongoose.Schema({
    humanClass,
    timesEscaped: numDef
})

const scp173Class = new mongoose.Schema({
    basicClass,
    placedTantrums: numDef,
})

const scp106Class = new mongoose.Schema({
    basicClass,
    caughtInPocket: numDef,
})

const scp096Class = new mongoose.Schema({
    basicClass,
    timesRaged: numDef,
})

const scp049Class = new mongoose.Schema({
    basicClass,
    timesRecalled: numDef,
})

const scp0492Class = new mongoose.Schema({
    basicClass,
    consummedCorpses: numDef,
})

const scp3114Class = new mongoose.Schema({
    basicClass,
    timesDisguised: numDef,
})

const scp079Class = new mongoose.Schema({
    basicClass,
    totalGainedExperience: numDef,
    teslaInteractions: numDef,
    roomBlackouts: numDef,
})

const scp939Class = new mongoose.Schema({
    basicClass,
    totalGainedExperience: numDef,
    teslaInteractions: numDef,
    savedVoices: numDef,
})


const classSlOverviewSchema = new mongoose.Schema({
    _id: String,
    nickname: String,
    ignoreDNT: Boolean,
    roleStats: [escapistClass, escapistClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, humanClass, escapistClass, humanClass, basicClass, basicClass, scp173Class, scp106Class, scp096Class, scp049Class, scp0492Class, scp3114Class, scp079Class, scp939Class],
    })


const SlDB = mongoose.connection.useDb('goldlegends_beta_testing_fix');
const ClassSlOverview = SlDB.model('role_stats', classSlOverviewSchema, 'role_stats')

export default ClassSlOverview