import { useState } from 'react';

const UsersSLWalletsTopChart = ({ usersSlWalltesOverview}: any) => {
  const itemsPerPage = 20; 
  let i = 0;
  const usersSlWalletsOverviewArray = Array.from(usersSlWalltesOverview);
 
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const userWallets = usersSlWalletsOverviewArray.map((user: any) => {
    // if(user.dntEnabled == true ) {
    //     return
    // }

        return {
            id: user._id,
            userName: user.nickname,
            wallet: user.wallet,
            number: 0
          }
  })

  const sortedUsers = userWallets.sort((a: any, b: any) => b.wallet - a.wallet);

  sortedUsers.forEach((el: any) => {
    if(el) {
        el.number = i++;
    }
    
  });

  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  return (
    <div className='flex flex-col gap-[16px] w-full'>
      {
        
        paginatedUsers.map((user: any, index:any) => {  
    
          return(
            (
              <div key={index} className='flex justify-between border-b-[1px] border-white_opacity pb-[16px] px-6'>
                <div className='text-[18px] font-roboto font-black'>{user.number + 1}.</div>
                <div className='text-[18px] font-roboto font-black '>{user.userName}</div>
                <div className='text-[18px] font-roboto font-black'>{user.wallet} N¢™</div>
              </div>
            )
          )
        })
      }

      <div className='flex justify-between text-[16px] ss:text-[20px]'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className='cursor-pointer hover__text__yellow'>
          Poprzednia Strona
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= userWallets.length} className='cursor-pointer hover__text__yellow'>
          Następna Strona
        </button>
      </div>
    </div>
  );
}

export default UsersSLWalletsTopChart;
