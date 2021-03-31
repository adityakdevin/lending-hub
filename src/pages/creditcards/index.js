import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { graphql } from 'gatsby'
import Hero from '../../components/Hero'
// import FeaturedCards from '../../components/creditcards/FeaturedCards'
import FeaturedKnowledgeHub from '../../components/creditcards/FeaturedKnowledgeHub'
import EditorsPick from '../../components/creditcards/EditorsPick'

const CreditCardHome = ({data}) => {
  const response = data.homepage.edges[0].node.frontmatter
  console.log("Credit Card RESPONSE")
  console.log(response)
  const items = [
    {
      key: 1,
      image: '/img/icons/employees.svg',
      imageHover: '/img/icons/employees_hover.svg',
      title: 'Personal',
      link: '/creditcards/questions',
    },
    {
      key: 2,
      image: '/img/icons/graduated.svg',
      imageHover: '/img/icons/graduated_hover.svg',
      title: 'Students',
      link: '/creditcards/questions',
    },
    {
      key: 3,
      image: '/img/icons/briefcase.svg',
      imageHover: '/img/icons/briefcase_hover.svg',
      title: 'Business',
      link: '/creditcards/questions',
    },
  ]
  return (
    <Layout>
      <Hero
        title={response.section1.heading}
        subtitle={response.section1.subheading1}
        subtitle2={response.section1.subheading2}
        imageSrc={response.section1.image}
        blockItems={items}
      />
      {/* <FeaturedCards /> */}
      <FeaturedKnowledgeHub />
      <EditorsPick type="credit-card"/>
    </Layout>
  )
}

export const pageQuery = graphql`
query HomePageCreditCard {
  homepage: allMarkdownRemark(
    filter: { frontmatter: { templateKey: { eq: "homepage-creditcard" } } }
  ) {
    edges {
      node {
        frontmatter {
          title
          section1 {
            heading
            subheading1
            subheading2
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default CreditCardHome
