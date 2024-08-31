import { NavLink} from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';
const SLDashboardNavbar = () => {
    const { user } = useAuthContext()

    return (
  
        <div className="text-white uppercase font-bold font-roboto text-center sm:text-left bg-dark_opacity  ">
            <div className="flex flex-col sm:flex-row">

              <NavLink to="/dashboard/sl/user" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow ' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>{user.username}</NavLink>
              <NavLink to="/dashboard/sl/class/personnel" className={({ isActive }) => (isActive ?
                'tracking-wide  gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow')}>Statystyki Klas</NavLink>
              <NavLink to="/dashboard/sl/wallet" className={({ isActive }) => (isActive ?
                'tracking-wide gold_bar px-6 py-3 gradient__gold hover__text__yellow' :
                'tracking-wide gold_bar px-6 py-3 hover__text__yellow ')}>Portfel</NavLink>
            </div>
        </div>
    )
}

export default SLDashboardNavbar
