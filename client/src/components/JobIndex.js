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
          <Container className='job-index' >
            <Nav variant="tabs" className='job-nav'>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('')} >All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('statusApplied/')}>Applied</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('statusInterview/')}>Interview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('statusOffer/')}>Offer</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('statusDeclined/')}>Declined</Nav.Link>
              </Nav.Item>
            </Nav>
            <Row className='index-labels'>
              <div style={{ width: '250px' }}>Company</div>
              <div style={{ width: '200px' }}>Job Title</div>
              <div style={{ width: '200px' }}>Job Type</div>
              <div style={{ width: '200px' }}>Application Status</div>
              <div style={{ width: '250px' }}>Activities</div>
            </Row>
            { jobData.map(item => {
              const { id } = item
              return (
                <>
                  <Row key={id} className='index-row'>
                    <Col md={1}>
                      <div className='box'>
                        <Link className='edit-btn' to={`/edit-job/${id}`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </Col>
                    <Col>
                      <div >
                        <Link className='index-item box' to={`/jobs/${item.id}`}>
                          <div style={{ width: '250px' }}>{item.company_name}</div>
                          <div style={{ width: '200px' }} className='title'>{item.title}</div>
                          <div style={{ width: '100px' }}>{item.job_type}</div>
                          <div style={{ width: '100px' }}>{item.job_status}</div>
                          <div>
                            <ul>
                              { item.activities.length > 0
                                ?
                                item.activities.map(activity => {
                                  return (
                                    <li style={{ width: '200px' }}key={activity.id}>
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
                        </Link>
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