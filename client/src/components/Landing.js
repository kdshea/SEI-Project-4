import '../styles/main.css'
import { Link } from 'react-router-dom'
import computerImg from '../img/computer.jpg'
import handshakeImg from '../img/handshake.jpg'

const Landing = () => {
  return (
    <main className='landing'>
      <section className='top'>
        <div>
          <img src={computerImg} alt="Researching on a computer" />
          <div>
            <p className="demo">Explore Seeker with these demo account credentials
              <br />
          Email: demo@mail.com  Password: demopassword</p>
          </div>
        </div>
        <div>
          <h2>Organize your job search</h2>
          <p>Manage all of your job applications in one place</p>
          <div className="landing-buttons">
            <Link to='/register'>
              <button>Register</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
          </div>

        </div>
      </section>
      <section className='bottom'>
        <div>
          <h2>How it works</h2>
          <ul>
            <li>Save job listings</li>
            <li>Research companies</li>
            <li>Set reminders</li>
            <li>Take notes</li>
            <li>Store contacts</li>
          </ul>
        </div>
        <div>
          <img src={handshakeImg} alt="Shaking hands at a meeting" />
        </div>
      </section>
    </main>
  )
}

export default Landing