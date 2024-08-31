import { useState, FormEvent } from 'react'
import { useForgot } from '../hooks/useForgot';

const ForgotForm = () => {

    const [email, setEmail] = useState('');
    const { forgot, error, isLoading } = useForgot()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      
        await forgot(email)
        
    }
  return (
    <div className='flex justify-center h-full'>

        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text__yellow font-roboto uppercase text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[35px] mb-[32px]'>Zresetuj Hasło</h2>
            <form action="" method="post" className='flex flex-col' onSubmit={handleSubmit}>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Wpisz swój email'
                    value={email} 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white font-roboto placeholder:text-white' />
                     <button  disabled={isLoading} type="submit"className='border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow'>Wyślij Email</button>
                    
                    {error && <div className='text-dark_red'>{error}</div>}

            </form>
        </div>
        
    </div>
  )
}

export default ForgotForm
