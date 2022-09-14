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
  const [ job, setJob ] = useState(null)
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/jobs/${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setJob(data)
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
          { job ? 
            <div className="kitchen-sink">
              <Card>
                {/* <Card.Img variant="top" src="" /> */}
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Title>{job.company_name}</Card.Title>
                  {/* <Card.Text>
                Some quick example text to build on the card title and make up 
                  </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <div>Post Date</div>
                    <div>{job.post_date}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Post URL</div>
                    <div>{job.job_url}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Job Type</div>
                    <div>{job.job_type}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Location</div>
                    <div>{job.location}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Salary</div>
                    <div>{job.salary}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Benefits</div>
                    <div> {job.benefits}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Description</div>
                    <div>{job.description}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Requirements</div>
                    <div>{job.requirements}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>Status</div>
                    <div>{job.job_status}</div>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Link to={`/edit-job/${jobId}`}><Button variant="primary">Edit</Button></Link>
                  
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