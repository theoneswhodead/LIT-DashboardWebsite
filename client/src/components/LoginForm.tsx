import { useState, FormEvent} from 'react'
import { NavLink } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { useVerify2fa } from '../hooks/useVerify2fa'

const LoginForm = () => {

    const { login, error, isLoading, isEnabled2fa } = useLogin()

    const {verify2fa, isLoadingVerify, errorVerify} = useVerify2fa()

    const [formLogin, setFormLogin] = useState({
      email: '',
      password: ''
    })

    const [form2fa, setForm2fa] = useState({
      code: '',
      currentPassword: ''
    })

    const handleChangeLogin = (e: any) => {
      setFormLogin({
        ...formLogin,
        [e.target.name]: e.target.value

      })
    } 

    const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await login(formLogin.email, formLogin.password) 
    }

 

    const handleChange2fa = (e: any) => {
      setForm2fa({
        ...form2fa,
        [e.target.name]: e.target.value 
      })
    } 

    const handleSubmit2fa = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await verify2fa(form2fa.code, form2fa.currentPassword, isEnabled2fa.token)
    }


  return (
    <div className='flex justify-center h-full'>
        <div className='flex flex-col w-[500px] p-[80px]'>
            {
             isEnabled2fa.enable2fa ? ( 
              <div>
                <h2 className='gradient__text__yellow font-roboto uppercase text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[35px] mb-[32px]'>Wpisz kod weryfikacyjny</h2>
                    <form 
                        action="" 
                        method="post" 
                        className={`flex flex-col pt-[16px]   `} 
                        onSubmit={handleSubmit2fa}>
                         <input 
                            type="text" 
                            name="code" 
                            id="code"
                            value={form2fa.code}
                            onChange={handleChange2fa}
                            placeholder={'Wpisz swój kod uwierzytelnienia'} 
                            className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white`}/>
                        <input 
                            type="password" 
                            name="currentPassword" 
                            id="currentPassword"
                            value={form2fa.currentPassword}
                            onChange={handleChange2fa}
                            placeholder='Wpisz swoje hasło' 
                            className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white`}/>

                        <button disabled={isLoadingVerify}  type="submit"className={`border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow`}>Zweryfikuj</button> 
                        {errorVerify && <div className='text-dark_red'>{errorVerify}</div>}
                    </form>
              </div> 
                 
              ) : (

                  <div>
                    <h2 className='gradient__text__yellow font-roboto uppercase text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[35px] mb-[32px]'>Witamy Ponownie!</h2>
                    <form action="" method="post" className='flex flex-col' onSubmit={handleSubmitLogin}>

                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={formLogin.email}
                    onChange={handleChangeLogin}
                    placeholder='Wpisz swój email'
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white font-roboto placeholder:text-white' />

                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={formLogin.password}
                    onChange={handleChangeLogin}
                    placeholder='Wpisz swoje hasło'
                    className='bg-transparent border border-white p-[16px] hover_gold text-white font-roboto placeholder:text-white'/>
                    <NavLink to="/forgot" className='text-white font-roboto mb-[24px] mt-[5px] hover__text__yellow'>Zapomniałeś hasła?</NavLink>

                    <button disabled={isLoading} type="submit"className='border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow'>Zaloguj Się</button>

                    {error && <div className='text-dark_red'>{error} </div>}

                    <NavLink to="/signup" className="text-white font-roboto mt-[5px]">Nie masz konta? <span className='hover__text__yellow'>Stwórz!</span></NavLink>
            </form>
                  </div>
                
              )
            }
            
        </div>
        
    </div>
  )
}

export default LoginForm
