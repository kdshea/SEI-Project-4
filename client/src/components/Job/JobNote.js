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
import Form from 'react-bootstrap/Form'

const JobNote = () => {
  const { jobId } = useParams()
  const [ noteData, setNoteData ] = useState(null)
  const [ errors, setErrors ] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notes/job${jobId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,  
          },
        })
        setNoteData(data)
      } catch (error) {
        setErrors(error.message)
        console.log(error.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      { noteData ?
        (noteData[0]
          ?
          <>
            <JobNav />
            <div>
              <Container>
                {  noteData.map(note => {
                  const { id } = note
                  return (
                    <>
                      <div className="kitchen-sink">
                        <Card>
                          {/* <Card.Img variant="top" src="" /> */}
                          <Card.Body>
                            {/* <Card.Title>Notes</Card.Title> */}
                            {/* <Card.Text>
                          Some quick example text to build on the card title and make up 
                            </Card.Text> */}
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              <div>Excitement Level</div>
                              <div>
                                <Form.Group>
                                  <Form.Control  type="range" min="0" max="100" step="10" name="excitement" value={note.excitement} />
                                </Form.Group>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div>Notes</div>
                              <div>{note.notes}</div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div>Questions</div>
                              <div>{note.questions}</div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div>Pros</div>
                              <div>{note.pros}</div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <div>Cons</div>
                              <div>{note.cons}</div>
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Link to={`/edit-note/job${jobId}/${note.id}`}><Button variant="primary">Edit</Button></Link>
                            
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  )
                }
                )}
              </Container>
            </div>
          </>
          :               
          <Link to={`/add-job/${jobId}/note`}>Add A Note</Link>)
        :
        <h2 className="text-center">
          { errors ? 'Something went wrong. Please try again later' : <Spinner />}
        </h2>
      }
    </>
  )
}

export default JobNote