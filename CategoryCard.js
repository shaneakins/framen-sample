import React from 'react'
import styled from 'styled-components'
import { Card, IconHeader } from 'components/Common'

const CategoryCard = ({ type, heading, text, noicon, large, children }) => {
  const cardinfo = {
    essential: { title: 'Essentials', icon: 'shieldcheck' },
    specialty: { title: 'Specialties', icon: 'shieldcircle' },
    core: { title: 'CORE Dosing', icon: 'shieldcircle' },
    testkit: { title: 'Nutrient Test Kit', icon: 'tap' }
  }

  return (
    <CategoryCardCore large={large}>
      <Card nopadding>
        {type && (
          <IconHeader
            size={30}
            fontSize={26}
            type={type && cardinfo[type] && cardinfo[type].icon}
            title={cardinfo[type] && cardinfo[type].title}
            noicon={noicon}
          />
        )}
        <Card nopaddingy>
          <p className="h3">{heading}</p>
          <p>{text}</p>
          {children}
        </Card>
      </Card>
    </CategoryCardCore>
  )
}

export default CategoryCard

const CategoryCardCore = styled.div`
  width: 100%;
  flex: none;
  margin-right: 20px;

  p.h3:first-child {
    margin: 0px 0 20px 0;
  }
  p.h3 + p {
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    width: ${props => (props.large ? '378px' : '330px')};
  }
`
