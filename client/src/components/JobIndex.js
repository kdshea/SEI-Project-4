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

  const [ jobData, setJobData ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
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
          <Container className='job-index index-container' >
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
              <Col md={2} >Company</Col>
              <Col md={3}>Job Title</Col>
              <Col md={2}>Job Type</Col>
              <Col md={3}>Application Status</Col>
              <Col md={2}>Activities</Col>
            </Row>
            { jobData.length > 0
              ?
              jobData.map(item => {
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
                            <Col md={2} >{item.company_name}</Col>
                            <Col md={2} className='title'>{item.title}</Col>
                            <Col md={1}>{item.job_type}</Col>
                            <Col md={1}>{item.job_status}</Col>
                            <Col md={3}>
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
                            </Col>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </>
                )
              })
              :
              <></>
            }
            <Link to={'/add-job'} className='center-btn'>
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