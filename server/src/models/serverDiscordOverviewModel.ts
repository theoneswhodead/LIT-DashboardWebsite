import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const strReqUniq = {
    type: String,
    require: true,
    unique: true, 
}
const numDef = {
    type: Number,
    default: 0
}

const dailyStats = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    verificationLevel: numDef ,
    membersCount: numDef ,
    textChannelsCount: numDef ,
    voiceChannelsCount: numDef ,
    categoryCount: numDef ,
    roleCount: numDef,
    emojiCount: numDef ,
    stickersCount: numDef ,
    boostCount: numDef,
    joined: numDef,
    leaved: numDef,
    messageCount: numDef,
    voiceChannelMinutes: numDef
})


const serverOverviewSchema = new Schema({
    guildId: strReqUniq,
    dailyStats: [dailyStats] 
    },{
        timestamps: true
    })


const DiscordDB = mongoose.connection.useDb('discord');
const ServerOverview = DiscordDB.model('serveroverviews', serverOverviewSchema)

export default ServerOverview