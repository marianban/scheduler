import React from "react"

export const Newsletter = () => (
  <div className="newsletter-area ptb-70 bg-2">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="newsletter-wrap">
            <h2>Subscribe To Our Newsletter</h2>
            <p>Keep yourself updated with our list of newest booking apps. </p>
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="newsletter-wrap">
            <form
              action="https://gmail.us5.list-manage.com/subscribe/post?u=70505eb8d94b128a46d63c8b1&amp;id=1576e5ff74"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <input
                type="email"
                name="EMAIL"
                placeholder="Enter your email here..."
              />
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_70505eb8d94b128a46d63c8b1_1576e5ff74"
                  tabindex="-1"
                  value=""
                />
              </div>
              <button className="btn-style" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)
