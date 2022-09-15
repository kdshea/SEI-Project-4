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
import Card from 'react-bootstrap/Card'

const JobActivities = () => {
  const { jobId } = useParams()
  const [ contactData, setContactData ] = useState(null)
  const [ contactsRemoved, setContactsRemoved ] = useState(0)
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/contacts/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setContactData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    } 
    getData()
  }, [jobId, contactsRemoved])

  const deleteContact = async (event, contactId) => {
    event.preventDefault()
    try {
      const { data } = await axios.delete(`${API_URL}/contacts/${contactId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setContactsRemoved(contactsRemoved + 1)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  return (
    <>
      { contactData ?
        <>
          <JobNav />
          <div>
            <Container>

              { contactData.map(item => {
                const { id } = item
                return (
                  <>
                    <div className="kitchen-sink">
                      <Card>
                        {/* <Card.Img variant="top" src="" /> */}
                        <Card.Body>
                          <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                          <Card.Text>{item.title}</Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item>
                            <div><i className="fa-solid fa-phone"></i></div>
                            <div>{item.phone}</div>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div><i className="fa-solid fa-envelope"></i></div>
                            <div>{item.email}</div>
                          </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                          {/* <Link to={`/edit-contact/job${jobId}/${item.id}`}><Button variant="primary">Edit</Button></Link> */}
                          <Link to={`/edit-contact/job${jobId}/${item.id}`}>
                            <Button><i className="fa-solid fa-pen-to-square"></i></Button>
                          </Link>
                          <Button variant="danger" onClick={event => deleteContact(event, item.id)}><i className="fa-solid fa-trash-can"></i></Button>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                )
              })
              }
              <Link to={`/add-job/${jobId}/contacts`}><Button>Add A Contact</Button></Link>
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