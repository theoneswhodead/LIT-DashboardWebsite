import { useState, FormEvent } from 'react'
import { useParams } from 'react-router';
import { useResetPassword } from '../hooks/userResetPassword';

const ResetPasswordForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { id, token } = useParams<{ id: string; token: string }>();

    const { resetPassword, isLoading, error } = useResetPassword();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      await resetPassword(id, token, username, email, password);

  }

  return (
    <div className='flex justify-center sm:mt-[80px] lg:mt-[120px] h-full'>

        <div className='flex flex-col w-[500px] p-[80px]'>
            <h2 className='text-white uppercase text-[24px] mb-[32px]'>Zresetuj <span className='text-dark_red '>Hasło</span></h2>

            <form 
            action="" 
            method="post" 
            className='flex flex-col' 
            onSubmit={handleSubmit}>
                    <label htmlFor='username' className='text-white '>Username</label>
                    <input 
                    type="text" 
                    name="username" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red'/>

                    <label htmlFor="email" className='text-white'>E-mail</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='lux@in.tenebris' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red' />

                    <label htmlFor="password" className='text-white'>Nowe Hasło</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Stwórz nowe silne hasło' 
                    className='mb-[24px] bg-transparent border border-white p-[16px] hover:border-dark_red text-white placeholder:text-dark_red'/>

                    <button disabled={isLoading}  type="submit"className='border hover:border-dark_red px-[48px] py-4 reflect text-center text-white'>Zresetuj <span className='text-dark_red '>Hasło</span></button> 
                    {error && <div>{error}</div>}
            </form>
        </div>
        
    </div>
  )
}

export default ResetPasswordForm
