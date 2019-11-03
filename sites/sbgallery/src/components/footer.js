import React from "react"

export const Footer = () => (
  <footer>
    <div className="footer-area bg-4 ptb-70">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-5 col-xs-12">
            <div className="footer-widget">
              <img src="img/logo2.png" alt="" />
              <p>
                Salon and Barber software gallery is a platform where you can
                find the best software for you. All application were handpicked
                and carefully considered before including to this page.
              </p>
            </div>
          </div>
          <div className="col-md-2 col-sm-3 col-xs-12">
            <div className="footer-widget">
              <h2 className="footer-title">Menu</h2>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-4 col-xs-12">
            <div className="footer-widget">
              <h2 className="footer-title">Contact Us</h2>
              <ul>
                <li>
                  <i className="fa fa-envelope"></i>
                  salonandbarbergallery@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom bg-1">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            Copyright &copy; 2019 <a href="#">S&amp;B Gallery</a>. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  </footer>
)
