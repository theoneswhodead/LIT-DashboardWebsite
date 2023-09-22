import { Navbar } from '../components'
import { Header, News, AboutUs, OldProjects } from '../containtes'

const Home = () => {
  console.log('Home ')
  return (
    <div >
      <div className='gradient__bg lg:h-[100vh]'>
        <Navbar />
        <Header />
      </div>
      
      <News/>
      <AboutUs/>
      <OldProjects />

    </div>
  )
}

export default Home
