import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { SLDashboardNavbar, Loader, ErrorInfo, SLUsersClassDashboardNavbar  } from "../components";
import { UserSLScpClassSummaryChart } from "../charts";


const DashboardSlScpClassOverview = ({classImage}: any) => {

  const basicClass = {
    _t: [],
    roleId: '',
    timesJumped: 0,
    kills: 0,
    deaths: 0,
    timePlayed: 0,
    lastPlayed: '',
    kdRatio: 0,
}

const scp173Class = {
  basicClass,
  placedTantrums: 0,
}

const scp106Class = {
  basicClass,
  caughtInPocket: 0,
}

const scp096Class = {
  basicClass,
  timesRaged: 0,
}

const scp049Class = {
  basicClass,
  timesRecalled: 0,
}

const scp0492Class = {
  basicClass,
  consummedCorpses: 0,
}

const scp3114Class = {
  basicClass,
  timesDisguised: 0,
}

const scp079Class = {
  basicClass,
  totalGainedExperience: 0,
  teslaInteractions: 0,
  roomBlackouts: 0,
}

const scp939Class = {
  basicClass,
  totalGainedExperience: 0,
  teslaInteractions: 0,
  savedVoices: 0,
}
const {user} = useAuthContext()
const [userSlScpClassOverview, setUserSlScpClassOverview] = useState({
    _id: '',
    nickname: '',
    ignoreDNT: false,
    roleStats: [scp173Class, scp106Class,  scp096Class, scp049Class, scp0492Class,scp3114Class, scp079Class, scp939Class],
});

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
 
        useEffect(()=> {
            const fetchUserSlOverview = async () => {
              setLoading(true);

              try {
                const response = await axios.get('http://localhost:5000/dashboard/sl/class/scp', {
                  withCredentials: true,
                  headers: { 'Authorization': `Bearer ${user.token}` }
                 })
    
                if(response.status === 200) {
                  const jsonData = response.data; // one servwr temp 
                  setUserSlScpClassOverview(jsonData);
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
              fetchUserSlOverview()
            }
         }, [])

  return (
    <div className='text-white flex flex-col w-full px-6 pb-6 sm:px-[40px] lg:px-[80px] gap-[33px]'>
      <SLDashboardNavbar/>
      <SLUsersClassDashboardNavbar />

      {
         error ?
         (
            <ErrorInfo errorMessage={errorMessage.toString()}/>
   
         ) : loading ?
         (
           <Loader />
         ) : (

          classImage.map((img:any, index:any ) => {
            return(
              <div className="flex flex-col gap-[33px] " key={index}>
               <UserSLScpClassSummaryChart userSlScpClassOverview={userSlScpClassOverview} img={img} classNumber={index}/>
            </div>
            )
            })
        )
      }

  </div>
  )
}

export default DashboardSlScpClassOverview
