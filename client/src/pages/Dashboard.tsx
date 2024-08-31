
import { OverviewDashboardNavbar } from "../components"

const Dashboard = () => {

  return (
    <div className="text-white flex flex-col w-full px-6 sm:px-[40px] lg:px-[80px] gap-[33px]">
      <OverviewDashboardNavbar />
      <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-montserrat font-black text-center p-6">Witaj na głównej stronie dashboardu serwera GoldLegends</h2>
      <h3 className="text-[24px] leading-[32px] font-roboto text-center p-6">Zapoznaj się ze swoimi statystykami na naszych serwerach klikając Przegląd na górze strony i wybierając sekcję, która cię interesuje. Pamiętaj o autoryzowaniu swoich kont Discord oraz Steam.</h3>
    </div>
  )
}

export default Dashboard
