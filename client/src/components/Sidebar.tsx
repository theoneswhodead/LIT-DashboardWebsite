import { NavLink} from "react-router-dom"
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';




const Sidebar = () => {

  const { user } = useAuthContext()

  const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }


  return (

      <div className="text-white hidden sm:flex flex-col ml-[40px] lg:ml-[80px] fixed mt-[187px]">
          <div className="flex flex-col sm:gap-[24px] md:gap-[33px]">
            <NavLink to="/dashboard/server-sl-overview" className={({ isActive }) => (isActive ? 'tracking-wide bg-dark_red px-6 py-2 rounded-lg' : 'tracking-wide hover:bg-dark_red px-6 py-2 rounded-lg')}>Serwer SCP: SL</NavLink>
            <NavLink to="/dashboard/user-discord-overview" className={({ isActive }) => (isActive ? 'tracking-wide bg-dark_red px-6 py-2 rounded-lg' : 'tracking-wide hover:bg-dark_red px-6 py-2 rounded-lg')}>Użytkownik Discord</NavLink>
            <NavLink to="/dashboard/server-discord-overview" className={({ isActive }) => (isActive ? 'tracking-wide bg-dark_red px-6 py-2 rounded-lg' : 'tracking-wide hover:bg-dark_red px-6 py-2 rounded-lg')}>Serwer DC</NavLink>
            <NavLink to="/dashboard/text-channel-overview" className={({ isActive }) => (isActive ? 'tracking-wide bg-dark_red px-6 py-2 rounded-lg' : 'tracking-wide hover:bg-dark_red px-6 py-2 rounded-lg')}>Kanały tekstowe</NavLink>
            <NavLink to="/dashboard/voice-channel-overview" className={({ isActive }) => (isActive ? 'tracking-wide bg-dark_red px-6 py-2 rounded-lg' : 'tracking-wide hover:bg-dark_red px-6 py-2 rounded-lg')}>Kanały głosowe</NavLink>

          </div>
          <div className="fixed bottom-20">
            {
              user && 
              <button className="hover:text-dark_redd tracking-wide  hover:bg-dark_red reflect px-6 py-2 rounded-lg " onClick={handleClick}>{user.username} Wyloguj </button>
            }
              
          </div>
      </div>

  )
}

export default Sidebar