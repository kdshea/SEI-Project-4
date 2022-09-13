import axios from 'axios'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'


const ActivityIndex = () => {

  const [ activityData, setActivityData ] = useState([])
  const [ errors, setErrors ] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/activities/`, {
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
      { activityData[0] ?
        <div>
          <Container as="main" >


            <h1>Breadcrumb Nav Here</h1>

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
                        <Link to={`/edit-activity/${id}`}>
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

export default ActivityIndex