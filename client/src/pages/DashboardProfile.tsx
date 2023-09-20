import { useState, FormEvent, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useUpdateCredentials } from '../hooks/useUpdateCredentials'

const DashboardProfile = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { updateCredentials, error, isLoading } = useUpdateCredentials()

    const [discordSignin, setDiscordSignin] = useState(false);
    const [steamSignin, setSteamSignin] = useState(false);



    useEffect(() => {
      if(Cookie.get('discordToken')) {
        setDiscordSignin(true)
      }
    },[])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

    await updateCredentials(username, email, password)
  }
  return (
    
        <div className='text-white mt-[60px] flex flex-col  md:flex-row gap-[33px]'>
            <div className='flex flex-col sm:w-[350px] lg:w-[500px]  gradient__card rounded-3xl m-6 sm:m-[40px] sm:mr-0 lg:m-[80px] lg:mr-0 p-6 pb-[80px] sm:p-[40px] sm:pb-[80px] lg:p-[80px]'>
             <h2 className='text-white uppercase text-[24px] mb-[32px]'>Ustawienia <span className='text-dark_red '>Profilu</span></h2>

        <form 
        action="" 
        method="post" 
        className='flex flex-col' 
        onSubmit={handleSubmit}>
            <label htmlFor='username' className='text-white '>Zmień Username</label>
            <input 
                type="text" 
                name="username" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder='Nowy username' 
                className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red'/>

            <label htmlFor="email" className='text-white'>Nowy e-mail</label>
            <input 
                type="email" 
                name="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder='newlux@in.tenebris' 
                className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red' />

            <label htmlFor="password" className='text-white'>Nowe hasło</label>
            <input 
                type="password" 
                name="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Wybierz nowe silne hasło' 
                className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red'/>

            <button disabled={isLoading}  type="submit"className='border hover:border-dark_red px-[48px] py-4 reflect text-center text-white'>Zaktualizuj <span className='text-dark_red '>Dane</span></button> 
             {error && <div className='text-dark_red'>{error}</div>}
        </form>

            </div>
            <div className='gradient__card rounded-3xl p-6 sm:p-[40px] lg:p-[80px] m-6  sm:m-[40px] lg:m-[80px] lg:ml-0 md:ml-0'>
                <h2 className='text-white uppercase text-[24px] mb-[32px]'>Połącz <span className='text-dark_red '>Konta</span></h2>
            {
              discordSignin
              ?  <div className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300 mb-[24px]">
              <img src="../../assets/discord-icon.svg" alt="" className="h-7 w-7 mr-4"/>
              <span className="text-sm">Połączono</span>
             </div>
             :
             <a className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300 mb-[24px]"
             href="http://localhost:5000/dashboard/auth/discord/login">
             <img src="../../assets/discord-icon.svg" alt="" className="h-7 w-7 mr-4"/>
             <span className="text-sm">Połącz konto Discord</span>
            </a>
            }

{
              steamSignin
              ?  <div className="flex items-center py-2 px-4 rounded-lg bg-[#2a475e] hover:bg-[#1b2838]/80 hover:text-white/80 transition-colors duration-300 mb-[24px]">
             <img src="../../assets/steam-icon.svg" alt="" className="h-7 w-7 mr-4"/>
              <span className="text-sm">Połączono</span>
             </div>
             :
             <a className="flex items-center py-2 px-4 rounded-lg bg-[#2a475e] hover:bg-[#1b2838]/80 hover:text-white/80 transition-colors duration-300 mb-[24px]"
             href="http://localhost:5000/dashboard/auth/discord/login">
             
             <img src="../../assets/steam-icon.svg" alt="" className="h-7 w-7 mr-4"/>
             <span className="text-sm">Połącz konto Steam</span>
            </a>
            }
            
            </div>
            
        </div>  
  )
}

export default DashboardProfile
