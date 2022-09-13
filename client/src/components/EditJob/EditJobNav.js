
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditJobNav = () => {
  const { jobId } = useParams()

  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}`}>Job Details</Nav.Link> 
      </Nav.Item>
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/activities`}>Activities</Nav.Link>
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
      <Nav.Item>
        <Nav.Link style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }} as={Link} to={`/edit-job/${jobId}/company`} >Company</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
  
  
export default EditJobNav