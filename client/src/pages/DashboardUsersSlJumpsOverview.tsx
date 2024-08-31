import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar, SLUsersDashboardNavbar, Loader, ErrorInfo, SelectPeriod } from "../components";
import { UsersSLTopChart } from "../charts";

const DashboardUsersSlJumpsOverview = () => {
 const {user} = useAuthContext()
 const [usersSlOverview, setUsersSlOverview] = useState({
    _id: '',
    nickname: '',
    ignoreDNT: false,
    dntEnabled: false,
    dailyStats: [
      {
        lastJoin: '',
        timesJumped: 0,
        onlineTime: 0,
        deaths: 0,
        kills: 0,
        firedShots: 0,
        accurateShots: 0,
        headshots: 0,
        _id: '',
        kdRatio: 0,
        accuracy: '',
        headshotPercentage: '',
    }
    ],
    kills: 0,
    deaths: 0,
    firedShots: 0,
    accurateShots: 0,
    headshots: 0,
    enteredPocket: 0,
    escapedPocket: 0,
    timesJumped: 0,
    caughtInPocket: 0,
    onlineTime: 0,
    firstJoined: '',
    lastSeen: '',
    kdRatio: 0,
    accuracy: '',
    headshotPercentage: '',
    });
const [period, setPeriod] = useState(30)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const sumTimesJumpedCount = (dailyStats: any[]) =>
dailyStats.reduce((sum, daily) => sum + daily.timesJumped, 0);


 useEffect(()=> {
    const fetchUsersSlOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/dashboard/overview/users-sl/jumps', {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${user.token}` }
    
          })
          if (response.status === 200) {
            const jsonData = response.data; // one servwr temp
            setUsersSlOverview(jsonData);
          }
          setLoading(false);
      } catch (error:any) {
        if (error.response && error.response.status === 404) {
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } else if(error.response && error.response.status === 400){
          setErrorMessage(JSON.stringify(error.response.data.error))
          setError(true);
        } 
        setLoading(false);
      }
    }
    if(user) {
      
      fetchUsersSlOverview()
    }
 }, [])

  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>
    <SLUsersDashboardNavbar />

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
        <Loader />
      ) : (
        <div>
          <SelectPeriod period={period} setPeriod={setPeriod}/>
        
          <div className="flex flex-col sm:flex-row gap-[33px] justify-between w-full">
          <UsersSLTopChart usersSlOverview={usersSlOverview} period={period} itemsPerPage={20} sumFunctionCount={sumTimesJumpedCount} text={"Bunny hopperzy:"} format={false}/>

          </div>
        </div>
      )
    }
  </div>
  )
}

export default DashboardUsersSlJumpsOverview
