import axios from 'axios'
import { useState } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setToken } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Register = () => {

  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  // const [ loginData, setLoginData ] = useState('')
  const [ errors, setErrors ] = useState(false)
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    // if (event.target.name === 'userName' || event.target.name === 'password') {
    //   setLoginData({ ...loginData, [event.target.name]: event.target.value })
    // }
    setErrors(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('form data ->', formData)
      const { data } = await axios.post(`${API_URL}/auth/register/`, formData)
      console.log('data', data)
      // autoLogin()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // const autoLogin = async (event) => {
  //   try {
  //     const { data } = await axios.post(`${API_URL}/auth/login/`, loginData)
  //     setToken(data.token)
  //     navigate('/')
  //   } catch (error) {
  //     setErrors(error)
  //     console.log(error)
  //   }
  // }

  return (
    <main className='form-page'>
      <Container className='register-form' as='main'>
        <Row>
          <h1>Register</h1>    
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="text" name="first_name" placeholder="First Name" value={formData.first_name} /> 
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} /> 
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control  onChange={handleChange} type="email" name="email" placeholder='Email' value={formData.email}  />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="password" name="password" placeholder='Password' value={formData.password}  />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Control onChange={handleChange} type="password" name="password_confirmation" placeholder='Confirm Password' value={formData.password_confirmation} /> 
            </Form.Group>
            { errors && <p className='text-danger'>{errors}</p>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </main>

  )
}

export default Register 