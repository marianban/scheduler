import React from "react"

export const BlogArea = () => (
  <div className="blog-area ptb-70 bg-2">
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-xs-12">
          <div className="section-title text-center">
            <h2>Our Community</h2>
            <p>
              Learn, share, and connect with a community of like-minded
              creators.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="blog-wrap">
            <div className="blog-img">
              <img src="img/blog/1.jpg" alt="" />
            </div>
            <div className="blog-info">
              <a href="#">How to Design a Logo: 50 Tutorials and Pro Tips</a>
              <div className="blog-meta">
                <span>
                  by{" "}
                  <a href="#">
                    <b>Jigsawlab</b>
                  </a>{" "}
                  in{" "}
                  <a href="#">
                    <b>Stationery</b>
                  </a>
                </span>
                <span>Nov 5, 2016</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="blog-wrap">
            <div className="blog-img">
              <img src="img/blog/2.jpg" alt="" />
            </div>
            <div className="blog-info">
              <a href="#">
                Why Color Fonts Are The Next Big Thing in Typography
              </a>
              <div className="blog-meta">
                <span>
                  by{" "}
                  <a href="#">
                    <b>admin</b>
                  </a>{" "}
                  in{" "}
                  <a href="#">
                    <b>Typography</b>
                  </a>
                </span>
                <span>Nov 5, 2016</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="blog-wrap">
            <div className="blog-img">
              <img src="img/blog/3.jpg" alt="" />
            </div>
            <div className="blog-info">
              <a href="#">How to Design a Logo: 50 Tutorials and Pro Tips</a>
              <div className="blog-meta">
                <span>
                  by{" "}
                  <a href="#">
                    <b>Kazierfan </b>
                  </a>{" "}
                  in{" "}
                  <a href="#">
                    <b>Tips</b>
                  </a>
                </span>
                <span>Feb 11, 2017</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
