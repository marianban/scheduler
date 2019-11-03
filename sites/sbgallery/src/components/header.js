import React from "react"

const Header = () => (
  <header>
    <div className="header-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-xs-8">
            <div className="logo">
              <a href="#">
                <img src="images/S&B_Gallery_logo.png" alt="" />
              </a>
            </div>
          </div>
          <div className="col-md-9 hidden-sm hidden-xs">
            <div className="mainmenu text-right">
              <nav>
                <ul id="navigation">
                  <li className="active">
                    <a href="index.html">home</a>
                  </li>
                  <li>
                    <a href="contact.html">contact</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-xs-4 hidden-lg hidden-md">
            <div className="responsive-menu-wrap floatright"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

Header.propTypes = {}

Header.defaultProps = {}

export default Header
