import { Link } from 'react-router-dom'
import computerImg from '../img/computer.jpg'
import handshakeImg from '../img/handshake.jpg'

const Landing = () => {
  return (
    <main className='landing'>
      <section>
        <div>
          <img src={computerImg} alt="Researching on a computer" />
        </div>
        <div>
          <h2>Organize your job search</h2>
          <p>Manage all of your job applications in one place</p>
          <Link to='/register'>
            <button>Sign Up For Free</button>
          </Link>
        </div>
      </section>
      <section>
        <div>
          <h2>How it works</h2>
          <ul>
            <li>Save job listings</li>
            <li>Research companies</li>
            <li>Track your progress</li>
            <li>Set reminders</li>
            <li>Keep notes</li>
            <li>Store contacts</li>
          </ul>
        </div>
        <div>
          <img src={handshakeImg} alt="Shaking hands at a meeting" />
        </div>
      </section>
      <section>
        <Link to='/register'>
          <button>Join Now</button>
        </Link>
      </section>
    </main>
  )
}

export default Landing