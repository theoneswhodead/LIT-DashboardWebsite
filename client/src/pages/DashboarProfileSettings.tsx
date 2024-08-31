import { useState, useEffect } from 'react'
import { DashboardSettingsNavbar } from '../components'
import { useAuthContext } from "../hooks/useAuthContext";
import { UsernameChangeForm, EmailChangeForm, PasswordChangeForm, Enable2faForm } from '../components';
import axios from 'axios'
import Cookies from 'js-cookie'

const DashboarProfileSettings = () => {

  const { user, dispatch } = useAuthContext()
  const [ hiddenEmail, setHiddenEmail ] = useState('')
  const [ showEmail, setShowEmail ] = useState(false)
  const [ toggleUsernameChange, setToggleUsernameChange] = useState(false)
  const [ toggleEmailChange, setToggleEmailChange] = useState(false)
  const [ togglePasswordChange, setTogglePasswordChange] = useState(false)
  const [ enable2fa, setEnable2fa ] = useState(false)
  const [ animate, setAnimate ] = useState('dropdown_form_open')
  const [ animatePasswordForm, setAnimatePasswordForm ] = useState('dropdown_form_open')
  const [ loading, setLoading ] = useState(true)
  const [ errorGet, setErrorGet ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ qrCode, setQrCode ] = useState({
    status: "",
        data: {}
});

const fetch2faqr = async () => {
  setLoading(true);

  try {
    const response = await axios.get('http://localhost:5000/dashboard/profile/settings', {
      withCredentials: true,
      headers: { 'Authorization': `Bearer ${user.token}` }
     })

    if(response.status === 200) {
      const jsonData = response.data;
      setQrCode(jsonData);
      const cookie = Cookies.get('user')

      if(cookie) {
        const parseCookie = JSON.parse(cookie)
        const newCookie = {...parseCookie, enable2fa: jsonData.user.enable2fa }
        Cookies.remove("user")

        Cookies.set('user', JSON.stringify(newCookie), { expires: 3 })
      }

      dispatch({ type: 'LOGIN', payload: jsonData?.user });
    }
    setLoading(false);
  } catch (error:any) {
    if (error.response && error.response.status === 404) {
      setErrorMessage(JSON.stringify(error.response.data.error))
      setErrorGet(true);
    } else if(error.response && error.response.status === 400){
      setErrorMessage(JSON.stringify(error.response.data.error))
      setErrorGet(true);
    }
    setLoading(false);
  }
}
  const handleToggleCredentialsChange = async (ms:any, stateOne:any, statFuncOne:any,  stateFuncTwo:any) => {
   
    if(stateOne) {
      setAnimate("dropdown_form_close")
      await new Promise(r => setTimeout(r, ms))
    } else if(!stateOne) {
      setAnimate("dropdown_form_open")
    }
        stateFuncTwo(false)
      statFuncOne((prev:any) => !prev)
  }

  const handleTogglePasswordChange = async (ms:any, stateOne:any, statFuncOne:any,  stateFuncTwo:any) => {
    
    if(stateOne) {
      setAnimatePasswordForm("dropdown_form_close")
      await new Promise(r => setTimeout(r, ms))
    } else if(!stateOne) {
      setAnimatePasswordForm("dropdown_form_open")
    }
      stateFuncTwo(false)
      statFuncOne((prev:any) => !prev) 
      
  }

  const handleToggle2faChange = async (ms:any, stateOne:any, statFuncOne:any,  stateFuncTwo:any) => {
    
    if(stateOne) {
      setAnimatePasswordForm("dropdown_form_close")
      await new Promise(r => setTimeout(r, ms))
    } else if(!stateOne) {
      setAnimatePasswordForm("dropdown_form_open")
    }
      stateFuncTwo(false)
      statFuncOne((prev:any) => !prev) 
      if(user || stateOne) {
        fetch2faqr()  
      }  
  }

    useEffect(() => {
      const userEmail = user.email;
      const userEmailArray = userEmail.split('@');
      const num = userEmailArray[0].length;
      const newemail = '*'.repeat(num) + '@' + userEmailArray[1];
        
      setHiddenEmail(newemail)
    },[user.email])
  
  return (
    
    
        <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>
          <DashboardSettingsNavbar />
          
            <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px]  flex flex-col sm:flex-row gap-[33px]'>
              <div className='sm:w-1/2 flex flex-col gap-[33px]'>
                <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Podstawowe Dane</h2>
                <div className='flex flex-col gap-[33px]'>
                  <div className='flex flex-col xs:flex-row gap-[16px] xs:gap-0 justify-between '>
                    <div className=''>
                      <h3 className='font-roboto text-[24px] leading-[32px] font-black' >Username</h3>
                        <p className='font-roboto gradient__text__yellow leading-[25px] lg:leading-[26px]'>{user.username}</p>
                    </div>
                    <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleToggleCredentialsChange(900, toggleUsernameChange, setToggleUsernameChange, setToggleEmailChange)}>Edytuj</button>
                  </div>
                  
                  <div className='flex flex-col xs:flex-row gap-[16px] xs:gap-0 justify-between'>
                    <div className=''>
                      <h3 className='font-roboto text-[24px] leading-[32px] font-black' >E-mail</h3>
                      <div className='flex gap-[16px]'>
                        <p className='font-roboto gradient__text__yellow leading-[25px] lg:leading-[26px]'>{showEmail ? user.email : hiddenEmail}</p>
                        <button className='font-roboto hover__text__yellow ' onClick={() => setShowEmail((prev) => !prev)}>{showEmail ? 'Ukryj': 'Pokaż'}</button>
                      </div>
                    </div>
                    <button className='font-roboto hover__text__yellow border_gold p-4' onClick={() => handleToggleCredentialsChange(900, toggleEmailChange, setToggleEmailChange, setToggleUsernameChange)}>Edytuj</button>
                  </div>
                </div>
              </div>
              <div className='sm:w-1/2'>
                  <UsernameChangeForm toggleMenu={toggleUsernameChange} animate={animate} />
                  <EmailChangeForm toggleMenu={toggleEmailChange} animate={animate} />
            </div>
          </div>

            <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px] flex flex-col sm:flex-row gap-[33px]'>
             <div className=' sm:w-1/2 flex flex-col gap-[33px]'>
              <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Hasło i Autentyfikacja</h2>
              <div>
                  <button className='font-roboto hover__text__yellow border_gold px-4 py-2' onClick={() => handleTogglePasswordChange(900, togglePasswordChange, setTogglePasswordChange, setEnable2fa)}>Edytuj Hasło</button>
              </div>
              <div className=''>
                <h3 className='font-roboto text-[24px] leading-[32px] font-black pb-[33px]' >Weryfikacja dwuetapowa</h3>
                {
                  user.enable2fa ? (
                    <button className='font-roboto hover:text-red-600 border px-4 py-2 text-red-500' onClick={() => handleToggle2faChange(900, enable2fa, setEnable2fa, setTogglePasswordChange)}>Wyłacz weryfikacje</button>

                  ) : 
                  <button className='font-roboto hover__text__yellow border_gold px-4 py-2' onClick={() => handleToggle2faChange(900, enable2fa, setEnable2fa, setTogglePasswordChange)}>Włacz weryfikacje</button>
                  
                }   
              </div>  
             </div>
             <div className='sm:w-1/2 '>
            
               <PasswordChangeForm toggleMenu={togglePasswordChange} animate={animatePasswordForm} />
               <Enable2faForm toggleMenu={enable2fa} animate={animatePasswordForm} loading={loading} errorMessage={errorMessage} errorGet={errorGet} qrCode={qrCode}/>

             </div>
           </div>  
        </div>  
  )
}

export default DashboarProfileSettings
