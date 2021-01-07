import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BlackButtonLink } from '../../components/common/common'
import { can_mortgage_payment } from '../../components/common/utils'
import Image from 'gatsby-image'

const MortgageBlock = ({
  currentRate,
  mortgageType,
  mortgages,
  filterData,
}) => {
  const item = mortgages.node.frontmatter
  const [showBlock, setShowBlock] = useState(true)

  const getRate = () => {
    const { totalMortgage, rateType, mortgageTerm } = filterData
    const item = mortgages.node.frontmatter
    let rate
    if (rateType === 'fixed') {
      rate = item[`fixed`][`_${mortgageTerm}`]
    } else {
      rate = item[`variable`][`_${mortgageTerm}`]
    }
    return rate
  }

  const getMonthlyAmount = () => {
    const { totalMortgage, rateType, mortgageTerm } = filterData
    const rate = getRate() / 100
    const monthly = can_mortgage_payment(totalMortgage, rate, 25, 12, 1)
    return monthly
  }

  useEffect(() => {
    const existingRate = Number(currentRate)
    const chosenRate = getRate()
    if (mortgageType === 'Renewal' && chosenRate > existingRate) {
      setShowBlock(false)
    }
  }, [filterData])

  return (
    <MortgageBlockContainer displayBlock={showBlock}>
      <div className="mortgage-details">
        <div className="provider">
          <div className="icon-text">
            <Image fixed={item.logo.childImageSharp.fixed} />
            <h3 className="name title-24-nb">{item.title}</h3>
          </div>
        </div>
        <div className="rate">{getRate()}%</div>

        <div className="monthly-payment">${getMonthlyAmount()}/mo</div>
        <div className="action">
          <BlackButtonLink to="/">Apply Now</BlackButtonLink>
        </div>
      </div>
      <hr />
    </MortgageBlockContainer>
  )
}

const MortgageBlockContainer = styled.div`
  display: ${(props) => (props.displayBlock ? 'block' : 'none')};
  hr {
    background-color: #1c1c1e;
    height: 1px;
  }
  .mortgage-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-text {
      display: flex;
      align-items: center;
      .name {
        margin-left: 15px;
      }
    }
    .provider {
      width: 40%;
    }
    .rate {
      width: 20%;
      font-size: 2rem;
    }
    .monthly-payment {
      width: 20%;
      font-size: 1.5rem;
      padding: 0px 3%;
      .item {
        width: 150px;
        .value {
        }
      }
    }
    .action {
      width: 20%;
    }
  }
  @media screen and (max-width: 786px) {
    .mortgage-details {
      flex-wrap: wrap;
      .provider {
        width: 100%;
      }
      .rate {
        width: 100%;
        text-align: center;
        font-size: 2.5rem;
      }
      .monthly-payment {
        width: 100%;
        margin-top: 1rem;
        text-align: center;
        .item {
          width: 200%;
        }
      }
      .action {
        width: 100%;
      }
    }
  }
`

export default MortgageBlock
