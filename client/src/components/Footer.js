const Footer = () => {

  return (
    <div className="footer-container">

      <div className="footer shadow p-3">
        <div className='tagline'>
          The job you seek is seeking you.
        </div>
        <div >
          <p>
            Created by Kate Shea
            <a className="gitLink" href="https://github.com/kdshea" target="_blank" rel="noreferrer" >
              <i className="fa-brands fa-github"></i> 
            </a>
            <a className="gitLink" href="https://www.linkedin.com/in/katedshea/" target="_blank" rel="noreferrer" > 
              <i className="fa-brands fa-linkedin"></i> 
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Footer