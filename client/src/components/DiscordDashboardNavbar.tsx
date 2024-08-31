import { NavLink} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';


const DiscordDashboardNavbar = () => {
    const { user } = useAuthContext()

    return (
  
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  ">
            <div className="flex flex-col sm:flex-row">

              <NavLink to="/dashboard/discord/user" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>{user.username}</NavLink>
              <NavLink to="/dashboard/discord/server" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>GoldLegends</NavLink>
              <NavLink to="/dashboard/discord/text" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Kanały tekstowe</NavLink>
              <NavLink to="/dashboard/discord/voice" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>Kanały głosowe</NavLink>
            </div>
        </div>
    )
}

export default DiscordDashboardNavbar
