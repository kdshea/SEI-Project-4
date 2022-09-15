import axios from 'axios'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'


const JobIndex = () => {

  const [ jobData, setJobData ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('filter', filter)
        const { data } = await axios.get(`${API_URL}/jobs/${filter}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setJobData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [filter])

  return (
    <>
      { jobData ?
        <div>
          <Container fluid as="main" >
            <Nav variant="tabs">
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('')} >All</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('statusApplied/')}>Applied</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('statusInterview/')}>Interview</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('statusOffer/')}>Offer</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('statusDeclined/')}>Declined</Nav.Item>
            </Nav>
            { jobData.map(item => {
              const { id } = item
              return (
                <>
                  <Row key={id}>
                    <Col md={1}>
                      <div className='box'>
                        <Link to={`/edit-job/${id}`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </Col>
                    <Col>
                      <div className='index-item box' >
                        <Link to={`/jobs/${item.id}`}>
                          <div>{item.company_name}</div>
                          <div>{item.title}</div>
                          <div>{item.job_type}</div>
                          <div>{item.job_status}</div>
                        </Link>
                        <div>
                          <ul>
                            { item.activities.length > 0
                              ?
                              item.activities.map(activity => {
                                return (
                                  <li key={activity.id}>
                                    {activity.category} {activity.due_date}
                                  </li>
                                )
                              })
                              :
                              <>
                                <Link to={`/add-job/${id}/activities`}><Button>Add An Activity</Button></Link>
                              </>
                            }
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              )
            })
            }
            <Link to={'/add-job'}>
              <Button>Add A Job</Button>
            </Link>
          </Container>
        </div>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
        
      }
    </>
  )
}

export default JobIndex