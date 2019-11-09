import React from "react"
import ProductsData from "../content/products.yaml"

export const SearchArea = () => (
  <div className="search-area ptb-70 bg-2">
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-xs-12">
          <div className="section-title text-center">
            <h2>
              {ProductsData.products.length} Salon and Barber Software Products
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
)
