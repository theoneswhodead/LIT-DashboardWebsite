import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions";
import { SLDashboardNavbar, Loader, ErrorInfo  } from "../components";
import { UserSLSummaryChart, UserSLKDChart, UserSLPlayTimeChart, UserSLShotsChart } from "../charts";


const DashboardUserSlOverview = () => {
    const {user} = useAuthContext()
    const { height, width } = useWindowDimensions();
    const [userSlOverview, setUserSlOverview] = useState({
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

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
 
        useEffect(()=> {
            const fetchUserSlOverview = async () => {
            setLoading(true);

            try {
              const response = await axios.get('http://localhost:5000/dashboard/sl/user', {
                withCredentials: true,
                headers: { 'Authorization': `Bearer ${user.token}` }
               })
  
              if (response.status === 200) {
                const jsonData = response.data[0]; // one servwr temp 
                setUserSlOverview(jsonData);
              }
              setLoading(false);
            } catch (error: any) {
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
              fetchUserSlOverview()
            }
         }, [])


let chartHeight = 400;
if(height > chartHeight){
  if(width < 420) {
    chartHeight = 250
  } 
} 

  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
      <SLDashboardNavbar/>

      {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
        <Loader />
      ) : (
          <div className="font-roboto">
            <UserSLSummaryChart userSlOverview={userSlOverview}/>
            <div className="bg-dark_opacity p-6 mt-[33px]">
                <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">K/D:</h2>
                <UserSLKDChart userSlOverview={userSlOverview} chartHeight={width < 420 ? 350 : 400} chartWidth={'100%'}/>
            </div>
            <div className="bg-dark_opacity p-6">
                <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Czas spędzony na serwerze:</h2>
                <UserSLPlayTimeChart userSlOverview={userSlOverview} chartHeight={width < 420 ? 350 : 400} chartWidth={'100%'}/>
            </div>
            <div className="bg-dark_opacity p-6">
                <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] mb-[8px]">Statystyki oddanych strzałów</h2>
                <UserSLShotsChart userSlOverview={userSlOverview} chartHeight={width < 420 ? 350 : 400} chartWidth={'100%'}/>
            </div>

          </div>
        )
      }

  </div>
  )
}

export default DashboardUserSlOverview
