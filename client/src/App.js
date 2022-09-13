import './styles/main.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import JobIndex from './components/JobIndex'
import ActivityIndex from './components/ActivityIndex'
import AddJobDetails from './components/AddJob/AddJobDetails'
import JobDetails from './components/Job/JobDetails'
import EditJobDetails from './components/EditJob/EditJobDetails'
import AddJobActivities from './components/AddJob/AddJobActivities'
import JobActivities from './components/Job/JobActivities'
import EditJobActivities from './components/EditJob/EditJobActivities'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/jobs' element={<JobIndex />} />
          <Route path='/activities' element={<ActivityIndex />} />
          <Route path='/add-job' element={<AddJobDetails />} />
          <Route path='/jobs/:jobId' element={<JobDetails />} />
          <Route path='/edit-job/:jobId' element={<EditJobDetails />} />
          <Route path='/add-job/:jobId/activities' element={<AddJobActivities />} />
          <Route path='/jobs/:jobId/activities' element={<JobActivities />} />
          <Route path='/edit-activity/job:jobId/:activityId' element={<EditJobActivities />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
