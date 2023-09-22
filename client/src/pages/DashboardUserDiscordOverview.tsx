import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"

interface UserData {
  userId: string;
  userName: string;
  dailyStats: [{
    date: string;
    messageCount: number;
    attachmentCount: number;
    stickerCount: number;
    linkCount: number;
    userMentionCount: number;
    roleMentionCount: number;
    voiceChannelMinutes: number;
    xpCount: number;
    levelCount: number;
    balance: number;
    warnCount: number;
  }];

}


const DashboardUserDiscordOverview = () => {
  console.log('DashboardUserDiscordOverview ')
 const {user} = useAuthContext()
 const [userOverview, setUserOverview] = useState<UserData>({ 
  userId: '',
  userName: '',
  dailyStats: [
    {
      date: '',
      messageCount: 0,
      attachmentCount: 0,
      stickerCount: 0,
      linkCount: 0,
      userMentionCount: 0,
      roleMentionCount: 0,
      voiceChannelMinutes: 0,
      xpCount: 0,
      levelCount: 0,
      balance: 0,
      warnCount: 0,
    }
  ] });

 useEffect(()=> {
    const fetchUserOverview = async () => {

      const response = await axios.get('http://localhost:5000/dashboard/user-discord-overview', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }

      })
      if (response.status === 200) {
        const jsonData = response.data;
        
        setUserOverview(jsonData);
      }
    }
    if(user) {
      
      fetchUserOverview()
    }
 }, [])
  
 console.log(userOverview)


  return (
    <div className='text-white'>
    <p>User ID: {userOverview.userId}</p>
    <p>User Name: {userOverview.userName}</p>
    <p>Daily Stats:</p>
    <ul>
      {userOverview.dailyStats.map((dailyStat, index) => (
        <li key={index}>
          <p>Date: {dailyStat.date}</p>
          <p>Message Count: {dailyStat.messageCount}</p>
          <p>Attachment Count: {dailyStat.attachmentCount}</p>
          <p>Sticker Count: {dailyStat.stickerCount}</p>
          <p>Link Count: {dailyStat.linkCount}</p>
          <p>User Mention Count: {dailyStat.userMentionCount}</p>
          <p>Role Mention Count: {dailyStat.roleMentionCount}</p>
          <p>Voice Channel Minutes: {dailyStat.voiceChannelMinutes}</p>
          <p>XP Count: {dailyStat.xpCount}</p>
          <p>Level Count: {dailyStat.levelCount}</p>
          <p>Balance: {dailyStat.balance}</p>
          <p>Warn Count: {dailyStat.warnCount}</p>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default DashboardUserDiscordOverview
