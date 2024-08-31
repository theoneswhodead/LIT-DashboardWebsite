import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { OverviewDashboardNavbar, Loader, ErrorInfo } from "../components";
import { UsersSLWalletsTopChart } from "../charts";

const DashboardUsersSlWalletsOverview = () => {
 const {user} = useAuthContext()
 const [usersSlWalltesOverview, setUsersSlWalltesOverview] = useState({
    _id: '',
    nickname: '',
    ignoreDNT: false,
    toggleHint: true,
    wallet: 0
    });

const [loading, setLoading] = useState(true)
const [error, setError] = useState(false);
const [errorMessage, setErrorMessage] = useState('');


 useEffect(()=> {
    const fetchUsersSlOverview = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/dashboard/overview/wallets-sl', {
          withCredentials: true,
          headers: { 'Authorization': `Bearer ${user.token}` }
          })
          if (response.status === 200) {
            const jsonData = response.data; // one servwr temp
            setUsersSlWalltesOverview(jsonData);
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
      }
    }

    if(user) {
      fetchUsersSlOverview()
    }
 }, [])

  return (
    <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>    
    <OverviewDashboardNavbar/>

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row gap-[33px] justify-between w-full">
            <div className="p-6 bg-dark_opacity w-full">
            <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">Najbogatsi na serwerze:</h2>
            <div className="flex justify-between">
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Nick</h3>
              <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Wartość</h3>
            </div>
                <UsersSLWalletsTopChart usersSlWalltesOverview={usersSlWalltesOverview} />
            </div>

          </div>

        </div>
      )
    }
  </div>
  )
}

export default DashboardUsersSlWalletsOverview
