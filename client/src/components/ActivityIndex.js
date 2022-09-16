import axios from 'axios'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import { Container, Nav, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'

const AllActivities = () => {

  const [ activityData, setActivityData ] = useState(null)
  const [ errors, setErrors ] = useState(false)
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/${filter}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setActivityData(data)
        console.log(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [filter])

  const upcomingFilter = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.get(`${API_URL}/activities/upcoming/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      setActivityData(data)
      console.log('new filter')
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>

      { activityData 
        ?
        <div>
          <Container className='index-container' >
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('')} >All Activities</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('today/')}>Due Today</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('upcoming/')}>Past Due</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('completedFalse/')}>Incomplete</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setFilter('completedTrue/')}>Completed</Nav.Link>
              </Nav.Item>
            </Nav>
            { activityData.map(item => {
              const { id } = item
              return (
                <>
                  <Row className='index-row' key={id} >
                    <Col md={1}>
                      <div className='box'>
                        <Form>
                          <Form.Check 
                            type="checkbox"
                            id="completed_status"
                            label={item.completed_status}
                          />
                        </Form>
                      </div>

                    </Col>
                    <Col>
                      <div className='index-item box'>
                        <div className='title'>{item.category}</div>
                        <div>{item.job.company_name}</div>
                        <div>{item.job.title}</div>
                        <div>{item.due_date}</div>
                      </div>
                    </Col>
                    <Col md={1}>
                      <div className='box'>
                        <Link to={`/edit-activity/job${item.job.id}/${id}`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </>
              )
            })
            }
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

export default AllActivities