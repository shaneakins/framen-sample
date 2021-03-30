import React from 'react'
import styled from 'styled-components'
import {IconComponent} from 'components/Common'

const SupplementTag = ({ category, categoryText, text, nocapstags}) => {
  return (
    <SupplementTagCore nocapstags={nocapstags}>
      {category && <IconComponent
        type={category}
        size={14}
      />}
      <p>{categoryText || category || text}</p>
    </SupplementTagCore>
  )
}

export default SupplementTag

const SupplementTagCore = styled.div`
  padding: 4px;
  background: var(--lightgrey);
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:not(:last-child){
      margin-right: 10px;
  }

  & > div:first-child {
    margin-right: 4px;
  }

  p {
      font-size: 11px;
      text-transform: ${props => props.nocapstags ? ' ' : 'capitalize'};
  }
`
