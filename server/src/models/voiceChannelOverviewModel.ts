import mongoose  from 'mongoose';

const numDefault = {
    type: Number,
    default: 0 
}

const strReqUniq = {
    type: String,
    require: true,
    unique: true, 
}

const dailyVoiceChannelSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    voiceChannelMinutes: numDefault,
})

const voiceChannelSchema = new mongoose.Schema({
    channelId: strReqUniq,
    channelName: {
        type: String,
        required: true,
       
    },
    dailyStats: [dailyVoiceChannelSchema]

})

const voiceChannelOverviewSchema = new mongoose.Schema({
    guildId: strReqUniq,
    channels: [voiceChannelSchema]
    },{
        timestamps: true
    })

const DiscordDB = mongoose.connection.useDb('discord');
const VoiceChannelOverview = DiscordDB.model('voicechanneloverviews', voiceChannelOverviewSchema)

export default VoiceChannelOverview


