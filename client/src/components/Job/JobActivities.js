import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../../config.js'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from '../Spinner.js'
import JobNav from './JobNav'
import { getToken } from '../helpers/auth.js'
import  Button  from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const JobActivities = () => {
  const { jobId } = useParams()
  const [ activityData, setActivityData ] = useState(null)
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setActivityData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [])

  return (
    <>
      { activityData ?
        <>
          <JobNav />
          <div>
            <Container>

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
                          <Link to={`/edit-activity/job${jobId}/${id}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </>
                )
              })
              }
              <Link to={`/add-job/${jobId}/activities`}>Add An activity</Link>
            </Container>
          </div>
        </>
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      }
    </>
  )
}

export default JobActivities