import { useState, FormEvent } from 'react'
import { useSignup } from '../hooks/useSignup'

const SignupForm = () => {

    const { signup, error, isLoading } = useSignup()

    const [form, setForm] = useState({
      username: '',
      email: '',
      password: ''
    })

    const handleChange = (e: any) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value

      })
    } 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await signup(form.username, form.email, form.password)
  }

  return (
    <div className='flex justify-center h-full'>
        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='gradient__text__yellow font-roboto uppercase text-[28px] leading-[28px] font-black sm:text-[32px] sm:leading-[48px] lg:text-[35px] mb-[32px]'>Stwórz Konto</h2>
            <form 
            action="" 
            method="post" 
            className='flex flex-col' 
            onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="username" 
                    id="username"
                    onChange={handleChange} 
                    placeholder='Username' 
                    className='mb-[24px] bg-transparent border border-white font-roboto p-[16px] hover_gold text-white placeholder:text-white'/>
                    
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    onChange={handleChange} 
                    placeholder='gold@legends.pl' 
                    className='mb-[24px] bg-transparent border border-white font-roboto p-[16px] hover_gold text-white placeholder:text-white' />

                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={handleChange}
                    placeholder='Wpisz silne hasło' 
                    className='mb-[24px] bg-transparent border border-white font-roboto p-[16px] hover_gold text-white placeholder:text-white'/>

                    <button disabled={isLoading} type="submit"className='border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow'>Stwórz Konto</button> 
                    {error && <div className='text-dark_red'>{error}</div>}
            </form>
        </div>
        
    </div>
  )
}

export default SignupForm
