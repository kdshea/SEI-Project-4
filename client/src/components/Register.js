import axios from 'axios'
import { useState } from 'react'
import  Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import { setToken } from './helpers/auth'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Register = () => {

  const notify = (message) => {
    toast.info({ message }, {
      position: toast.POSITION.BOTTOM_CENTER,
    })
  }

  const navigate = useNavigate()
  const [ formData, setFormData ] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [ loginData, setLoginData ] = useState('')
  const [ errors, setErrors ] = useState('')
  
  const handleChange = (event, error) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    if (event.target.name === 'email' || event.target.name === 'password') {
      setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
    setErrors(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // console.log('post data ->', formData)
      const { data } = await axios.post(`${API_URL}/auth/register/`, formData)
      // console.log('response ->', data)
      autoLogin()
    } catch (error) {

      if ('username' in error.response.data.detail) {
        setErrors(error.response.data.detail.username[0])
      } 
      if ('email' in error.response.data.detail) {
        setErrors(error.response.data.detail.email[0])
      }
      if ('password' in error.response.data.detail) {
        setErrors(error.response.data.detail.password[0])
      } 
      if ('password_confirmation' in error.response.data.detail) {
        setErrors('Passwords do not match.')
      }
      if ('non_field_errors' in error.response.data.detail) {
        setErrors(error.response.data.detail.non_field_errors[0])
      }
    }
  }


  const autoLogin = async (event) => {
    try {
      // console.log('login data ->', loginData)
      const { data } = await axios.post(`${API_URL}/auth/login/`, loginData)
      setToken(data.token)
      navigate('/add-job')
    } catch (error) {
      setErrors(error)
      console.log(error)
    }
  }



  return (
    <main>
      <Container className='register-form'>

        {/* <div>
          <button onClick={notify}>Notify!</button>
          <ToastContainer />
        </div> */}

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
              <Form.Control  onChange={handleChange} type="username" name="username" placeholder='Username' value={formData.username}  />
              <Form.Text className="text-muted">
              </Form.Text>
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
            { errors && <p className='error text-danger'>{errors}</p>}
            <Form.Group className='center-btn'>
              <Button type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </main>

  )
}

export default Register 