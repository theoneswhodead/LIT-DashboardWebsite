import { useState } from 'react';

const UsersDiscordTopChart = ({ usersOverview, period, itemsPerPage, sumFunctionCount, text }: any) => {
  const currentDate: number = new Date().getTime();
  let i = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const parseDateStringToDate = (dateString: string): Date | null => {
    const parts = dateString.split('.');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    } else {
      console.error('Nieprawidłowy format daty:', dateString);
      return null;
    }
  };


  const usersCount = usersOverview.users.map((user: { dailyStats: any[]; userId: any; userName: any; }) => {
    
    const lastXDayStats = user.dailyStats.filter(stat => {
      const statDate: Date | null = parseDateStringToDate(stat.date);
      if (statDate) {
        const diffInDays: number = Math.floor((currentDate - statDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays < period;
      } else {
        return false;
      }
    });

    return {
      userId: user.userId,
      userName: user.userName,
      count: sumFunctionCount(lastXDayStats),
      number: 0
    };
  });

  const sortedUsers = usersCount.sort((a: any, b: any) => b.count - a.count);

  sortedUsers.forEach((el: any) => {
    el.number = i++;
  });

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-dark_opacity w-full">
    <h2 className="text-[25px] leading-[28px] font-black sm:text-[32px] sm:leading-[32px] lg:text-[40px] lg:leading-[48px] pb-6 sm:pb-[40px]">{text}</h2>
    <div className="flex justify-between">
      <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Pozycja</h3>
      <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Username</h3>
      <h3 className="text-[24px] leading-[32px] font-roboto font-black uppercase pb-6">Wartość</h3>
    </div>
    <div className='flex flex-col gap-[16px] w-full'>
      {
        
        paginatedUsers.map((user: any, index:any) => {  
    
          return(
            (
              <div key={index} className='flex justify-between border-b-[1px] border-white_opacity pb-[16px] px-6'>
               <div className='text-[18px] font-roboto font-black'>{user.number + 1}.</div>
               <div className='text-[18px] font-roboto font-black '>{user.userName}</div>
               <div className='text-[18px] font-roboto font-black'>{user.count}</div>
              </div>
            )
          )
          
        })
      }

      <div className='flex justify-between text-[16px] ss:text-[20px]'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='cursor-pointer hover__text__yellow'>
          Poprzednia Strona
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= usersCount.length} className='cursor-pointer hover__text__yellow'>
          Następna Strona
        </button>
      </div>
    </div>
    </div>
  );
}

export default UsersDiscordTopChart;
