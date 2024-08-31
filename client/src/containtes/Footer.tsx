const Footer = () => {
  return (
    <div id="footer" className='bg-footer flex flex-col justify-center p-6 sm:p-[40px] lg:p-[80px]'>
      <div className='text-white footer_bar flex flex-row justify-center items-center gap-[16px] xs:gap-[33px] p-6 sm:px-[40px] lg:px-[80px]'>

          <a href="https://www.instagram.com/goldenLeague/" target="_blank">
            <img src="../../Public/instagram.png" alt="" className='w-[25px] xs:w-[30px] lg:w-[45px] h-[30px] lg:h-[45px]  hover:scale-150 transform transition duration-250'/>
          </a>
          
          <a href="https://discord.gg/goldenleague" target="_blank"> 
           <img src="../../Public/discord-icon.svg" alt="" className='w-[20px] xs:w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] hover:scale-150 transform transition duration-250'/>
          </a>
          
   
          <a href="https://www.youtube.com/@golddenleague" target="_blank">
            <img src="../../Public/youtube.png" alt="" className='w-[20px] xs:w-[35px] lg:w-[50px] h-[35px] lg:h-[50px] hover:scale-150 transform transition duration-250'/>
          </a>
          
          <a href="https://www.tiktok.com/@goldenleague" target="_blank">
            <img src="../../Public/Tiktok.png" alt="" className='w-[25px] xs:w-[30px] lg:w-[45px] h-[30px] lg:h-[45px] hover:scale-150 transform transition duration-250'/>
          </a>
          
      </div>
      <p className='font-barlow_condensed text-white p-6 text-center sm:px-[40px] lg:px-[80px] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] lg:text-[16px] lg:leading-[28px]'>&copy; 2024 GoldenLeague. Wszystkie prawa zastrzeżone. </p>

    </div>
  )
}

export default Footer
