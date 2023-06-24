const Footer = () => {

  return (
    <div className="footer-container">

      <div className="footer shadow p-3">
        <div className='tagline'>
          The job you seek is seeking you.
        </div>
        <div >
          <p>
            <a href="https://kdshea.com/" target="_blank" rel="noreferrer" >
              Created by Kate Shea
            </a>

            
            <a className="gitLink" href="https://github.com/kdshea" target="_blank" rel="noreferrer" >
              <i className="fa-brands fa-github"></i> 
            </a>
            <a className="gitLink" href="https://www.linkedin.com/in/kdshea/" target="_blank" rel="noreferrer" > 
              <i className="fa-brands fa-linkedin"></i> 
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Footer