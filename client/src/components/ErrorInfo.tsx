const ErrorInfo = ({ errorMessage }: { errorMessage: any }) => {
    return (
      <div className='font-roboto flex flex-col items-center p-6 gap-[33px]'>
        <h2 className='text-[28px] leading-[28px] font-black font-roboto sm:text-[32px] sm:leading-[48px] lg:text[40px]'>Wystąpił nieoczekiwany błąd:</h2>
        <p className="text-[16px] sm:text-[18px] leading-[25px] lg:text-[22px]lg:leading-[26px]">{errorMessage}</p>
        <p>W celu uzyskania dokładniejszej pomocy zapraszamy na naszego discorda: </p><a className="flex items-center py-2 px-4 rounded-lg bg-[#5865F2] hover:bg-[#5865F2]/80 hover:text-white/80 transition-colors duration-300 mb-[24px] cursor-pointer"
             href="https://discord.gg/TtezRw3XPr">
              <img src="../../../assets/discord-icon.svg" alt="" className="h-7 w-7 mr-4"/>
              <span className="text-sm">Discord</span>
            </a>
      </div>
    );
  };

export default ErrorInfo
