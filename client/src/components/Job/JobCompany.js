import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import API_URL from '../../config.js'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from '../Spinner.js'
import JobNav from './JobNav'
import  Card  from 'react-bootstrap/Card'
import { getToken } from '../helpers/auth.js'
import  Button  from 'react-bootstrap/Button'

const JobDetails = () => {
  const { jobId } = useParams()
  const [ company, setCompany ] = useState(null)
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/companies/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setCompany(data[0])
        console.log('data', data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      <JobNav />
      <div>
        <Container>
          { company ? 
            <div className="kitchen-sink">
              <Card>
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title>{company.name}</Card.Title>
                  {/* <Card.Text>
                Some quick example text to build on the card title and make up 
                  </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <div>Industry</div>
                    <div>{company.industry}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Founded</div>
                    <div>{company.founded}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Location</div>
                    <div>{company.hq_location}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Size</div>
                    <div>{company.size}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Type</div>
                    <div>{company.type}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Website</div>
                    <div>{company.company_url}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Description</div>
                    <div>{company.description}</div>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Link to={`/edit-company/job${company.job}/${company.id}`}><Button variant="primary">Edit</Button></Link>
                  
                </Card.Body>
              </Card>
            </div>
            :
            <h2 className="text-center">
              { errors ? 'Something went wrong. Please try again later' : <Spinner />}
            </h2>
          } 
        </Container>
      </div>
    </>
  )
}

export default JobDetails