import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState  } from "react"
import { Loader, ErrorInfo, SLDashboardNavbar } from "../components";


const DashboardWalletSlOverview = () => {
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
        const response = await axios.get('http://localhost:5000/dashboard/sl/wallet', {
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
    <SLDashboardNavbar/>

    {
      error ?
      (
         <ErrorInfo errorMessage={errorMessage.toString()}/>

      ) : loading ?
      (
        <Loader />
      ) : (
        <div className="bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px]  flex flex-col sm:flex-row gap-[33px]">
          <div className="sm:w-2/5 flex flex-col gap-[33px]">
          <h2 className="text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]">Twój Portfel</h2>
          <div className='flex flex-col xs:flex-row gap-[16px] xs:gap-0 justify-between'>
                  <div className=''>
                    <h3 className='font-roboto text-[24px] leading-[32px] font-black'>Ilość NymCoin™</h3>
                    <div className='flex gap-[16px]'>
                      <p className='font-roboto gradient__text__yellow leading-[25px] lg:leading-[26px]'>{usersSlWalltesOverview.wallet} N¢™</p>
                    </div>
                  </div>
                </div>
          </div>
          <div className="w-3/5">
            <h3 className='font-roboto text-[24px] leading-[32px] font-black pb-[33px]'>Lista przedmiotów dostępnych w sklepie</h3>
            <div className="flex flex-col sm:flex-row gap-[33px]">
              <div>
                <p>Karta Dozorcy: <span className="gradient__text__yellow">500</span> NymCoin™</p>
                <p>Karta Naukowca: <span className="gradient__text__yellow">700</span> NymCoin™</p>
                <p>Karta Strefy: <span className="gradient__text__yellow">1000</span> NymCoin™</p>
                <p>Karta Ochrony: <span className="gradient__text__yellow">2000</span> NymCoin™</p>
                <p>Karta Kapitana: <span className="gradient__text__yellow">3000</span> NymCoin™</p>
                <p>Karta Administratora: <span className="gradient__text__yellow">4000</span> NymCoin™</p>
                <p>Karta O5: <span className="gradient__text__yellow">5000</span> NymCoin™</p>
                <p>Apteczka: <span className="gradient__text__yellow">300</span> NymCoin™</p>
                <p>Adrenalina: <span className="gradient__text__yellow">375</span> NymCoin™</p>
                <p>Leki przeciwbólowe: <span className="gradient__text__yellow">375</span> NymCoin™</p>
                <p>SCP-018: <span className="gradient__text__yellow">3750</span> NymCoin™</p>
                <p>SCP-207: <span className="gradient__text__yellow">3375</span> NymCoin™</p>
                <p>SCP-268: <span className="gradient__text__yellow">2500</span> NymCoin™</p>
              </div>
              <div>
                <p>SCP-330: <span className="gradient__text__yellow">350</span> NymCoin™</p>
                <p>SCP-500: <span className="gradient__text__yellow">2250</span> NymCoin™</p>
                <p>SCP-1853: <span className="gradient__text__yellow">1250</span> NymCoin™</p>
                <p>SCP-2176: <span className="gradient__text__yellow">1200</span> NymCoin™</p>
                <p>Rewolwer: <span className="gradient__text__yellow">4000</span> NymCoin™</p>
                <p>Strzelba: <span className="gradient__text__yellow">5000</span> NymCoin™</p>
                <p>Disruptor: <span className="gradient__text__yellow">9999</span> NymCoin™</p>
                <p>Granat zaczepny: <span className="gradient__text__yellow">3300</span> NymCoin™</p>
                <p>Amunicja .12: <span className="gradient__text__yellow">300</span> NymCoin™</p>
                <p>Amunicja 5.56 x 45mm: <span className="gradient__text__yellow">300</span> NymCoin™</p>
                <p>Amunicja .44: <span className="gradient__text__yellow">300</span> NymCoin™</p>
                <p>Amunicja 7,62 x 39mm: <span className="gradient__text__yellow">300</span> NymCoin™</p>
                <p>Amunicja 9 x 19 mmm: <span className="gradient__text__yellow">300</span> NymCoin™</p>
              </div>
              
              
              </div>
              <h3 className='font-roboto text-[24px] leading-[32px] font-black py-[33px]'>Aby kupić przedmiot z powyższej listy kliknij w grze ` wpisz .sklep kup [nazwa przedmiotu]</h3>
              
            
          </div>
       
      </div>
      )
    }
  </div>
  )
}

export default DashboardWalletSlOverview
