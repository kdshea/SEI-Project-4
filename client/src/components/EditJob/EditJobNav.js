
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API_URL from '../../config.js'
import Nav from 'react-bootstrap/Nav'
import { getToken } from '../helpers/auth.js'

const EditJobNav = () => {
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
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}`}>Job Details</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/company`} >Company</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/activities`}>Activities</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/notes`} >Notes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/contacts`} >Contacts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/documents`} >Documents</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
  
  
export default EditJobNav