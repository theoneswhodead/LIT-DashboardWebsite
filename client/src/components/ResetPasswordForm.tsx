import { useState, FormEvent } from 'react'
import { useParams } from 'react-router';
import { useResetPassword } from '../hooks/useResetPassword';

const ResetPasswordForm = () => {

    const [form, setForm] = useState({
      password: ''
    })

    const handleChange = (e: any) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value

      })
    } 

    const { id, token } = useParams<{ id: string; token: string }>();
    const { resetPassword, isLoading, error } = useResetPassword();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await resetPassword(id, token, form.password);
  }

  return (
    <div className='flex justify-center h-full'>

        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text__yellow font-roboto uppercase text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[35px] mb-[32px]'>Zresetuj Hasło</h2>

            <form 
            action="" 
            method="post" 
            className='flex flex-col' 
            onSubmit={handleSubmit}> 
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    onChange={handleChange}
                    placeholder='Wpisz nowe silne hasło' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover_gold text-white font-roboto placeholder:text-white'/>

                    <button disabled={isLoading} type="submit"className='border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow'>Zresetuj Hasło</button> 
                    {error && <div className='text-dark_red'>{error} </div>}
            </form>
        </div>
        
    </div>
  )
}

export default ResetPasswordForm
