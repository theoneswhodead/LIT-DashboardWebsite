import { useState, useEffect } from 'react'
import { DashboardSettingsNavbar, ErrorInfo } from '../components'
import { useSteamAuthContext } from '../hooks/useSteamAuthContext'
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios'
import { useIgnoreDnt } from '../hooks/useIgnoreDnt';

const DashboardIgnoreDNT = () => {
  const {user} = useAuthContext()
  const { steamUser } = useSteamAuthContext()
  const [errorIgnoreDnt, setErrorIgnoreDnt] = useState(false);
  const { ignoreDnt } = useIgnoreDnt()
  const [errorMessage, setErrorMessage] = useState('');
  const [userSlOverview, setUserSlOverview] = useState(false)
  const [classSlOverview, setClassSlOverview] = useState(false)
  const [userSlWallets, setUserSlWallets] = useState(false)
 
        useEffect(()=> {
            const fetchUserSlOverview = async () => {

            try {
              const response = await axios.get('http://localhost:5000/dashboard/profile/ignorednt', {
                withCredentials: true,
                headers: { 'Authorization': `Bearer ${user.token}` }
               })
  
              if (response.status === 200) {
                const jsonData = response.data; 
                setUserSlWallets(jsonData.userSlWallets[0].ignoreDNT)
                setClassSlOverview(jsonData.classSlOverview[0].ignoreDNT)
                setUserSlOverview(jsonData.userSlOverview[0].ignoreDNT)
              
              }
            } catch (error: any) {
              if (error.response && error.response.status === 404) {
                setErrorMessage(JSON.stringify(error.response.data.error))
                setErrorIgnoreDnt(true);
              } else if(error.response && error.response.status === 400){
                setErrorMessage(JSON.stringify(error.response.data.error))
                setErrorIgnoreDnt(true);
              }
             } 
            }

            if(user) {
              fetchUserSlOverview()
            }
         }, [])

         const handleClick = async (area: string) => {
          switch(area) {
            case 'userSlOverview':
              setUserSlOverview(prevState => {
                const newState = !prevState;
                ignoreDnt(userSlWallets, newState, classSlOverview);
                return newState;
              });
              break;
            case 'classSlOverview':
              setClassSlOverview(prevState => {
                const newState = !prevState;
                ignoreDnt(userSlWallets, userSlOverview, newState);
                return newState;
              });
              break;
            case 'userSlWallets':
              setUserSlWallets(prevState => {
                const newState = !prevState;
                ignoreDnt(newState, userSlOverview, classSlOverview);
                return newState;
              });
              break;
            default:
              break;
          }
        }

  return (

        <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>
          <DashboardSettingsNavbar />

          <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px] flex flex-col gap-[33px]'>
                <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Udziel zgody na ignorowanie Do Not Track</h2>
                {
                  steamUser ?
                  errorIgnoreDnt ?
                 (
                  <ErrorInfo errorMessage={errorMessage.toString()}/>
                 ) : (
                  <div className=' sm:w-5/5 flex flex-col gap-[33px]'>
                    <div >
                      <div className='flex flex-col gap-[33px] ss:flex-row justify-between pb-[33px] xs:pb-0'>
                        <h3 className='font-roboto text-[24px] leading-[32px] font-black' >Udziel zgody na zarabianie NymCoin™</h3>
                        <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleClick('userSlWallets')}>{userSlWallets ? 'Anuluj zgodę': 'Udziel zgody'}</button>
                      </div>
                      
                      <p className='font-roboto gradient__text__yellow text-[16px] leading-[25px] lg:leading-[26px]'>Udzielasz nam zgody na:</p>
                      <ul className='list-disc pl-[20px]'>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego steamID</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego Steam Nickname</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Wyświetlenie ilości twojej waluty na twoim profilu i naszym dashboardzie</li>
                      </ul>
                    </div>

                    <div>
                     <div className='flex flex-col gap-[33px] ss:flex-row justify-between pb-[33px] xs:pb-0'>
                        <h3 className='font-roboto text-[24px] leading-[32px] font-black' >Udziel zgody na zbieranie statystyk</h3>
                        <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleClick('userSlOverview')}>{userSlOverview ? 'Anuluj zgodę': 'Udziel zgody'}</button>
                      </div>
                      
                      <p className='font-roboto gradient__text__yellow text-[16px] leading-[25px] lg:leading-[26px]'>Udzielasz nam zgody na:</p>
                      <ul className='list-disc pl-[20px]'>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego steamID</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego Steam Nickname</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego IP</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twoich statystyk t.j.
                            <ul className='list-disc pl-[20px]'>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Oddane strzały</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Celne strzały</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Strzały w głowę</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Wejścia i wyjscia z wymiaru łzowego</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość zabójstw</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość śmierci</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość skoków</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Czas gry</li>
                            </ul>
                          </li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Wyświetlenie powyższych statystyk na twoim profilu i naszym dashboardzie</li>
                      </ul>
                    </div>

                    <div>
                     <div className='flex flex-col gap-[33px] ss:flex-row justify-between pb-[33px] xs:pb-0'>
                        <h3 className='font-roboto text-[24px] leading-[32px] font-black' >Udziel zgody na zbieranie statystyk klas</h3>
                        <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleClick('classSlOverview')} >{classSlOverview ? 'Anuluj zgodę': 'Udziel zgody'}</button>
                      </div>
                      
                      <p className='font-roboto gradient__text__yellow text-[16px] leading-[25px] lg:leading-[26px]'>Udzielasz nam zgody na:</p>
                      <ul className='list-disc pl-[20px]'>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego steamID</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twojego Steam Nickname</li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Przechowanie twoich statystyk dla każdej z klas t.j.
                            <ul className='list-disc pl-[20px]'>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Oddane strzały</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Celne strzały</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Strzały w głowę</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Wejścia i wyjscia z wymiaru łzowego</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość zabójstw</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość śmierci</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Ilość skoków</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Czas gry</li>
                              <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Użycia specjalnych umiejętności klas SCP t.j.
                                <ul className='list-disc pl-[20px]'>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-173 - Ilość umiejscowień swojej substancji</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-106 - Ilość złapań do wymiaru łzowego</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-096 - Ilość wejścia w stan furii</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-049 - Ilość wskrzeszeń</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-049-2 - Ilość zjedzonych zwłok</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-3114 - Ilość przebrań</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-079 - Ilość zdobytego XP</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-079 - Ilość użyć tesli</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-079 - Ilość wywołanych blackoutów</li>
                                  <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>SCP-939 - Ilość zapisanych głosów</li>

                              </ul>
                              
                              
                               złapanie do wymiaru łzowego wskr</li>
                            </ul>
                          </li>
                          <li className='font-roboto gradient__text__yellow text-[14px] leading-[25px] lg:leading-[26px]'>Wyświetlenie powyższych statystyk na twoim profilu</li>
                      </ul>
                    </div>
                </div>
                  ) :
                  <div>
                    <p className='font-roboto'>Aby udzielić zgody na ignorowanie DNT musisz autoryzować konto Steam</p>
                  </div>
                }
            </div>
        </div>  
  )
}

export default DashboardIgnoreDNT
