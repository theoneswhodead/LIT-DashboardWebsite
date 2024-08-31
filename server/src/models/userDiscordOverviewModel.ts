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

const dailyUserSchema = new mongoose.Schema({
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
    voiceChannelMinutes: numDefault,
    xpCount: numDefault,
    levelCount: numDefault,
    balance: numDefault,
    warnCount: numDefault
})

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        required: true,
       
    },
    dailyStats: [dailyUserSchema ]

})

const userOverviewSchema = new mongoose.Schema({
    guildId: strReqUniq,
    users: [userSchema ]
    },{
        timestamps: true
    })

const DiscordDB = mongoose.connection.useDb('discord');
const UserOverview = DiscordDB.model('useroverviews', userOverviewSchema)

export default UserOverview


