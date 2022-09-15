import axios from 'axios'
import JobNav from './../Job/JobNav'
import { getToken, getPayLoad } from '../helpers/auth'
import { useState, useEffect } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate, useParams } from 'react-router-dom'
import API_URL from '../../config.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const AddJobNote = () => {

  const { jobId } = useParams()
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    excitement: '',
    notes: '',
    questions: '',
    pros: '',
    cons: '',
    owner: '',
    job: '',
  })
  const [checked, setChecked] = useState(false)
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const payLoad = getPayLoad()
    const user = payLoad.sub.toString()
    setFormData({ ...formData, owner: user, job: jobId })
  }, [])
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    console.log('form data', formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('form data ->', formData)
      const { data } = await axios.post(`${API_URL}/notes/`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,  
        },
      })
      console.log(data)
      navigate(`/jobs/${jobId}/notes`)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  return (
    <>
      <div className='form-page'>
        <JobNav />
        <Container className='add-job'>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" >
                <Form.Label>Excitement Level</Form.Label>
                <Form.Control  onChange={handleChange} type="range" min="0" max="100" step="10" name="excitement" value={formData.excitement}  />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Notes</Form.Label>
                <Form.Control onChange={handleChange} type="textarea" name="notes" placeholder="+ add Notes" value={formData.notes} /> 
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Questions</Form.Label>
                <Form.Control onChange={handleChange} type="textarea" name="questions" placeholder="+ add Questions" value={formData.questions} /> 
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Pros</Form.Label>
                <Form.Control onChange={handleChange} type="textarea" name="pros" placeholder="+ add Pro" value={formData.pros} /> 
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Cons</Form.Label>
                <Form.Control onChange={handleChange} type="textarea" name="cons" placeholder="+ add Con" value={formData.cons} /> 
              </Form.Group>
              { errors && <p className='text-danger'>{errors}</p>}
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AddJobNote