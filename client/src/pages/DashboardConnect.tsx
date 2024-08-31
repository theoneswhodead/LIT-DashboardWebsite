import { useDiscordAuthContext } from '../hooks/useDiscordAuthContext'
import { useDiscordLogout } from '../hooks/useDiscordLogout'
import { useSteamAuthContext } from '../hooks/useSteamAuthContext'
import { useSteamLogout } from '../hooks/useSteamLogout'
import { DashboardSettingsNavbar } from '../components'

const DashboardConnect = () => {

  const { discordUser } = useDiscordAuthContext()
  const { discordLogout } = useDiscordLogout();

  const { steamUser } = useSteamAuthContext()
  const { steamLogout } = useSteamLogout();

 
    const handleDiscord = () => {
      discordLogout()
    }
    const handleSteam = () => {
      steamLogout()
    }

  return (
    
    
        <div className='text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px] '>
          <DashboardSettingsNavbar />

            <div className='bg-dark_opacity p-6 sm:px-[40px] lg:px-[80px] flex flex-col gap-[33px]'>
                <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text-[40px]'>Autoryzuj konta aby mieć dostęp do swoich statystyk </h2>
                <div>
                {
                    discordUser
                    ?
                    <div className="flex items-center py-2 px-4 w-[200px] border border-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white transition-colors duration-300 mb-[24px] cursor-pointer" onClick={handleDiscord}>
                        <img src="../../Public/discord-icon.svg" alt="discord" className="h-7 w-7 mr-4"/>
                        <span className="text-sm">Wyłącz Autoryzację</span>
                    </div>
                    :
                    <a className="flex items-center py-2 px-4 w-[200px] border border-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white transition-colors duration-300 mb-[24px] cursor-pointer"
                        href="https://discord.com/api/oauth2/authorize?client_id=1153269554210951208&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fdashboard%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify">
                        <img src="../../Public/discord-icon.svg" alt="discord" className="h-7 w-7 mr-4"/>
                        <span className="text-sm">Włącz Autoryzację</span>
                    </a>
                    }
                    {
                    steamUser
                    ?
                    <div className="flex items-center py-2 px-4 w-[200px] border border-[#2a475e] hover:bg-[#2a475e]/80 hover:text-white transition-colors duration-300 mb-[24px] cursor-pointer" onClick={handleSteam}>
                        <img src="../../Public/steam-icon.svg" alt="stam" className="h-7 w-7 mr-4"/>
                        <span className="text-sm cursor-pointer">Wyłącz Autoryzacje</span>
                    </div>
                    :
                    <a className="flex items-center py-2 px-4 w-[200px] border border-[#2a475e] hover:bg-[#2a475e]/80 hover:text-white transition-colors duration-300 mb-[24px] cursor-pointer"
                    href='http://localhost:5000/dashboard/auth/steam'>

                    <img src="../../Public/steam-icon.svg" alt="stam" className="h-7 w-7 mr-4"/>
                    <span className="text-sm">Włącz Autoryzację</span>
                    </a>
                    }
                </div>
            </div>
        </div>
  )
}

export default DashboardConnect
