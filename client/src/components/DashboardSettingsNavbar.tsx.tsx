import { NavLink} from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext";
import { useDiscordLogout } from "../hooks/useDiscordLogout";
import { useSteamLogout } from "../hooks/useSteamLogout";

const DashboardSettingsNavbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout();
  const { discordLogout } = useDiscordLogout();
  const { steamLogout } = useSteamLogout();
  const handleClick = () => {
        steamLogout()
        discordLogout()
        logout()
    }

  return (
  
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  flex flex-row justify-between">
            <div className="flex flex-col sm:flex-row w-full justify-between">
              <div className="flex flex-col sm:flex-row">
                <NavLink to="/dashboard/profile/settings" className={({ isActive }) => (isActive ?
                  'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                  'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Zarządzaj Kontem</NavLink>
                <NavLink to="/dashboard/profile/connect" className={({ isActive }) => (isActive ?
                  'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                  'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Połącz Konta</NavLink>
                <NavLink to="/dashboard/profile/ignorednt" className={({ isActive }) => (isActive ?
                  'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                  'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Udziel Zgody</NavLink>
              </div>
              <div >
            {
              user &&
              <button className="tracking-wide  px-6 py-3 hover__text__yellow text-white uppercase font-bold font-roboto text-center sm:text-left" onClick={handleClick}>Wyloguj się</button>
            }
            </div>
          </div>
        </div>
    )
}

export default DashboardSettingsNavbar
