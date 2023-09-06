import { Navbar } from '../components'
import { Header, News } from '../containtes'

const Home = () => {
  return (
    <div className='gradient__bg'>
      <Navbar />
      <Header />
      <News/>
    </div>
  )
}

export default Home
