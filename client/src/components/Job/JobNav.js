
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const JobNav = () => {
  const { jobId } = useParams()

  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}`}>Job Details</Nav.Link> 
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/activities`}>Activities</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/notes`} >Notes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/contacts`} >Contacts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/documents`} >Documents</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/jobs/${jobId}/company`} >Company</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
  
  
export default JobNav