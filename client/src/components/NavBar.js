
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated } from './helpers/auth'


const NavBar = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    window.localStorage.removeItem('local-user-Token')
    window.localStorage.removeItem('local-user-Id')
    navigate('/')
  }

  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Navbar.Brand as={Link} to="/">Seeker</Navbar.Brand>
      </Nav.Item>
      { userIsAuthenticated()
        ?
        <>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/add-job'>Add A Job</Nav.Link> 
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/activities'>Activities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={'/jobs'} >Job Board</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}  onClick={handleLogOut}>Logout</Nav.Link>
          </Nav.Item>
        </>
        :
        <>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/register'>Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to='/login'>Login</Nav.Link>
          </Nav.Item>
        </>      
      }      
    </Nav>
  )
}
  
  
export default NavBar