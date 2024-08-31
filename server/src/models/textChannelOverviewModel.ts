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

const dailyTextChannelSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    messageCount: numDefault,
    attachmentCount: numDefault,
    stickerCount: numDefault,
    linkCount: numDefault,
    userMentionCount: numDefault,
    roleMentionCount: numDefault,
})

const textChannelSchema = new mongoose.Schema({
    channelId: strReqUniq,
    channelName: {
        type: String,
        required: true,
       
    },
    dailyStats: [dailyTextChannelSchema]

})

const textChannelOverviewSchema = new mongoose.Schema({
    guildId: strReqUniq,
    channels: [textChannelSchema]
    },{
        timestamps: true
    })


const DiscordDB = mongoose.connection.useDb('discord');
const TextChannelOverview = DiscordDB.model('textchanneloverviews', textChannelOverviewSchema)

export default TextChannelOverview





