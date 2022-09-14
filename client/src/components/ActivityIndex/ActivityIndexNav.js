
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API_URL from '../../config.js'
import Nav from 'react-bootstrap/Nav'
import { getToken } from '../helpers/auth.js'

const ActivityIndexNav = () => {
  const { jobId } = useParams()
  const [ job, setJob ] = useState(null)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setJob(data)
        console.log('data', data)

      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      { job ?
        <>
          <h1>{job.title}</h1>
          <h2>{job.company_name}</h2>
        </>
        :
        <></>
      }
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}`}>All Activities</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/activities`}>Due Today</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/notes`} >Incomplete</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/contacts`} >Completed</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
  
  
export default ActivityIndexNav