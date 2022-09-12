import axios from 'axios'
import { getToken } from './helpers/auth'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import API_URL from '../config.js'
import Spinner from './Spinner.js'


const JobIndex = () => {

  const [ jobData, setJobData ] = useState([])
  const [ errors, setErrors ] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/`, {
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
  }, [])

  return (
    <>
      { jobData[0] ?
        <div>
          <Container as="main" >


            <h1>Breadcrumb Arrow Nav Here</h1>

            { jobData.map(item => {
              const { id } = item
              return (
                <Row key={id}>
                  <Col>
                    <Link to={`/edit-job/${id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </Col>
                  <Col>
                    <div>
                      <h3>{item.company}Company Name Here</h3>
                      <h3>{item.title}</h3>
                      <h3>{item.job_type}</h3>
                      <h3>{item.job_status}</h3>
                      <h3>Activities List Here</h3>
                    </div>
                  </Col>
                </Row>
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

export default JobIndex