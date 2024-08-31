import { useState, FormEvent } from "react"
import { useEnable2fa } from "../hooks/useEnable2fa"
import { useAuthContext } from "../hooks/useAuthContext";
import ErrorInfo from './ErrorInfo';
import Loader from "./Loader";

const Enable2faForm = ({toggleMenu, animate, loading, errorMessage, errorGet, qrCode}: {toggleMenu: any, animate:any, loading: any, errorMessage: any, errorGet: any, qrCode:any}) => {
    const { enable2fa, error, isLoading } = useEnable2fa()
    const { user } = useAuthContext()

    const [form, setForm] = useState({
        code: '',
        currentPassword: ''
      })
  
      const handleChange = (e: any) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
  
        })
      } 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        await enable2fa(form.currentPassword, form.code) 
      }

  return (
    <div className={` ${toggleMenu ? ' flex' : ' hidden'} flex-col  pt-[55px] ${animate}`}>

         {
            errorGet ?
            (
               <ErrorInfo errorMessage={errorMessage?.toString()}/>
      
            ) : loading ?
            (
              <Loader />
            )  : 
            !user.enable2fa && 
  
                <div className="pb-[80px]">
                    <div className="flex flex-col md:flex-row gap-[33px] sm:items-center">
                        <img src={qrCode.data.qrCodeUrl} alt="qr code" className="w-[250px] sm:w-[200px] sm:h-[200px] md:w-[200px] md:h-[200px] rounded-[3px]"/>
                        <div className="flex flex-col gap-[8px]">
                            <p className="font-roboto text-[16px] leading-[25px] lg:leading-[26px]">1. Pobierz i zainstaluj <a href="https://support.google.com/accounts/answer/1066447?hl=en" target="_blank" className="hover__text__yellow">Google Autenticator</a> na swój telefon.</p>
                            <p className="font-roboto text-[16px] leading-[25px] lg:leading-[26px]">2. Zeskanuj kod QR za pomocą <a href="https://support.google.com/accounts/answer/1066447?hl=en" target="_blank" className="hover__text__yellow">Google Autenticator.</a></p>
                            <p className="font-roboto text-[16px] leading-[25px] lg:leading-[26px]">3. Wpisz 6-cio cyfrowy kod poniżej, oraz swoje hasło w celu aktywowania weryfikacji dwuetapowej.</p>
                        </div> 
                    </div>
                    <form 
                        action="" 
                        method="post" 
                        className={`flex flex-col ${animate} pt-[16px]`} 
                        onSubmit={handleSubmit}>
                         <input 
                            type="text" 
                            name="code" 
                            id="code"
                            onChange={handleChange}
                            placeholder='Wpisz swój kod' 
                            className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}`}/>
                        <input 
                            type="password" 
                            name="currentPassword" 
                            id="currentPassword"
                            onChange={handleChange}
                            placeholder='Wpisz swoje hasło' 
                            className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}`}/>

                        <button disabled={isLoading}  type="submit"className={`border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow ${animate}`}>Aktywuj weryfikację</button> 
                        {error && <div className='text-dark_red'>{error}</div>}
                    </form>
                </div>
            
  
}
        

   </div>
  )
}

export default Enable2faForm
