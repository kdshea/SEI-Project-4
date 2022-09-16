
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from './helpers/auth'
import logo from '../img/logo.jpg'


const NavBar = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    navigate('/')
  }

  return (
    <div className='nav-wrapper'>
      { userIsAuthenticated()
        ?
        <>
          <Nav className='main-nav'>
            <Nav.Item>
              <Navbar.Brand as={Link} to="/jobs"><img width="75" height="75"src={logo} alt="Magnifying glass logo"/></Navbar.Brand>
            </Nav.Item>
          </Nav>

          <Nav className='main-nav'>
            <Nav.Item>
              <Nav.Link as={Link} to='/add-job'>Add A Job</Nav.Link> 
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/activities'>Activities</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={'/jobs'} >Job Board</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </>
        :
        <>
          <Nav className='main-nav'>
            <Nav.Item>
              <Navbar.Brand as={Link} to="/"><img width="100" height="100" className="d-inline-block align-top"src={logo} alt="Magnifying glass logo"/></Navbar.Brand>
            </Nav.Item>
          </Nav>
          <Nav className='main-nav'>
            <Nav.Item>
              <Nav.Link as={Link} to='/register'>Register</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  as={Link} to='/login'>Login</Nav.Link>
            </Nav.Item>
          </Nav>
        </>      
      }      
    </div>
  )
}
  
  
export default NavBar