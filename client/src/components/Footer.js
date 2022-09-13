const Footer = () => {

  return (
    <div className="footer-container">

      <div className="footer shadow p-3">
        <div>
          The job you seek is seeking you
        </div>
        <div>
        Created by Kate Shea
          <a className="gitLink" href="https://github.com/kdshea" target="_blank" rel="noreferrer" >
            <i className="fa-brands fa-github"></i> 
          </a>
          <a className="gitLink" href="https://www.linkedin.com/in/katedshea/" target="_blank" rel="noreferrer" > 
            <i className="fa-brands fa-linkedin"></i> 
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer