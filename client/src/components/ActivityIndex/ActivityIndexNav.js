
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API_URL from '../../config.js'
import Nav from 'react-bootstrap/Nav'
import { getToken } from '../helpers/auth.js'

const ActivityIndexNav = () => {
  const [ errors, setErrors ] = useState(false)


  return (
    <>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={'/activities'}>All Activities</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={'/activities'}>Due Today</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={'/activities'} >Incomplete</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={'/activities'} >Completed</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
  
  
export default ActivityIndexNav