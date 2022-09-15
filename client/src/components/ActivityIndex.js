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
          <Container as="main" >
            <Nav variant="tabs">
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('')} >All Activities</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('today/')}>Due Today</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('upcoming/')}>Past Due</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('completedFalse/')}>Incomplete</Nav.Item>
              <Nav.Item style={{ textDecoration: 'none', color: 'black', padding: '10px, 30px' }}onClick={() => setFilter('completedTrue/')}>Completed</Nav.Item>
            </Nav>
            { activityData.map(item => {
              const { id } = item
              return (
                <>
                  <Row key={id} >
                    <Col md={1}>
                      <div className='box'>
                        {/*  https://stackoverflow.com/questions/42682406/how-to-get-values-properties-from-a-react-bootstrap-checkbox */}
                        {/* https://react-bootstrap.github.io/forms/checks-radios/#form-check-props */}
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
                        <div>{item.category}</div>
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