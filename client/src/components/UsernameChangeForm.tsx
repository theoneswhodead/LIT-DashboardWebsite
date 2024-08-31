import { useState, FormEvent } from "react"
import { useUpdateUsername } from "../hooks/useUpdateUsername"

const UsernameChangeForm = ({toggleMenu, animate}: {toggleMenu: any, animate:any}) => {
    const { updateUsername, error, isLoading } = useUpdateUsername()

    const [form, setForm] = useState({
        newUsername: '',
        currentPassword: '',
      })
  
      const handleChange = (e: any) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
  
        })
      }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        await updateUsername(form.newUsername, form.currentPassword) 
      }

  return (
    <div className={` ${toggleMenu ? ' flex' : ' hidden'} flex-col sm:px-[40px]  lg:px-[80px] ${animate}`}>
        <form 
        action="" 
        method="post" 
        className={`flex flex-col ${animate}`} 
        onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="newUsername" 
                id="newUsername"
                onChange={handleChange} 
                placeholder='Nowy username' 
                className={`mb-[23px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}` }/>
            <input 
                type="password" 
                name="currentPassword" 
                id="currentPassword"
                onChange={handleChange}
                placeholder='Wpisz swoje hasło' 
                className={`mb-[33px] bg-transparent border border-white p-[16px] hover_gold text-white placeholder:text-white ${animate}`}/>

            <button disabled={isLoading}  type="submit"className={`border_gold font-roboto px-[48px] py-4 text-center text-white hover__text__yellow ${animate}`}>Zaktualizuj Username</button> 
            {error && <div className='text-dark_red'>{error}</div>}
        </form>
   </div>
  )
}

export default UsernameChangeForm
