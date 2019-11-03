import { graphql } from "gatsby"
import React from "react"
import Helmet from "react-helmet"
import { FeaturedProducts } from "../components/featured-products"
import Hero from "../components/hero"
import Layout from "../components/layout"
import { Newsletter } from "../components/newsletter"
import { Products } from "../components/products"
import { SearchArea } from "../components/search-area"
import SEO from "../components/seo"
import "./style.css"

export const query = graphql`
  {
    images: allFile(
      filter: {
        extension: { regex: "/(jpeg|jpg|gif|png)/" }
        sourceInstanceName: { eq: "products" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

const IndexPage = ({ data: { images } }) =>
  console.log(images) || (
    <Layout>
      <SEO title="Salon And Barber Software Gallery" />
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossorigin="anonymous"
        />
        <script
          src="https://kit.fontawesome.com/6d995c7810.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Hero />
      <SearchArea />
      <FeaturedProducts />
      <Products images={images} />
      <Newsletter />
    </Layout>
  )

export default IndexPage
