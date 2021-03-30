import React from 'react'
import styled from 'styled-components'
import { Card } from 'components/Common'
import IconVegan from './IconVegan'
import {
  uniqueId,
  stripVegan,
  compareNames
} from 'components/Common/utils/SupplementUtils'

const sortedPrescriptions = prescriptions => {
  const scripts = [...prescriptions]
  const scriptsNoVegan = scripts.map(p => ({ ...p, name: stripVegan(p.name) }))
  const sortedScripts = scriptsNoVegan.sort((a, b) =>
    a.name > b.name ? 1 : -1
  )
  return sortedScripts
}

const CorePanelRow = ({ supp }) => {
  const renderDots = val => {
    if (supp) {
      const total = supp.totals.totalNoPouches
      const pouch = supp.pouches.find(p => p.pouchNo === val)

      // Return nothing for CORE users without supps in a given pack
      if (!pouch && total !== 1) return null

      const num = total === 1 ? supp.pouches[0].pills : pouch.pills

      const arr = new Array(num || 1).fill(null)
      return arr.map(n => <div className="dot" key={uniqueId()} />)
    }
    return null
  }

  const suppInfo = `${supp.name}, ${supp.relevantIngredients[0].dosage} ${supp.relevantIngredients[0].unit}`
  return (
    supp.active && (
      <div className="body-row">
        <div className="body-data">
          <img src={supp.assets[0].url} alt="supplement" />
        </div>
        <div className="body-data">
          {suppInfo}
          {supp.vegan && <IconVegan />}
        </div>
        <div className="body-data">{renderDots(1)}</div>
        <div className="body-data">{renderDots(2)}</div>
        <div className="body-data">{renderDots(3)}</div>
        <div className="body-data">{renderDots(4)}</div>
      </div>
    )
  )
}

const CorePanel = ({ isMobile, prescriptions }) => {
  return (
    <CorePanelWrapper
      isMobile={isMobile}
      nopadding
      shadow
      rounded
      bgColor="white"
    >
      <div className="table">
        <div className="table-head">
          <div className="head-row">
            <div className="head-data first"></div>
            <div className="head-data uppercase">Supplements</div>
            <div className="head-data">
              <span className="pack">Pack </span>A
            </div>
            <div className="head-data">
              <span className="pack">Pack </span>B
            </div>
            <div className="head-data">
              <span className="pack">Pack </span>C
            </div>
            <div className="head-data">
              <span className="pack">Pack </span>D
            </div>
          </div>
        </div>
        <div className="table-body">
          {prescriptions &&
            sortedPrescriptions(prescriptions).map((p, i) => (
              <CorePanelRow key={`${p.name + i}`} supp={p} />
            ))}
        </div>
      </div>
    </CorePanelWrapper>
  )
}

export default CorePanel

const CorePanelWrapper = styled(Card)`
  display: flex;
  flex: 1;
  width: auto;
  max-width: 560px;
  background: var(--white);
  margin: ${props => (props.isMobile ? '12px 15px 0 15px' : '12px 20px 0 0')};
  .table {
    display: flex;
    flex-direction: column;
    flex: 1;
    .table-head,
    .table-body {
      display: flex;
      flex-direction: column;
      .head-row,
      .body-row {
        display: flex;
        justify-content: space-evenly;
        .head-data,
        .body-data {
          border-top: 1px solid var(--lightgrey);
          /* border-right: 1px solid black; */

          line-height: 40px;
          text-align: center;
          width: 100%;
          &:nth-child(1) {
            width: 60px;
            flex: none;
            text-align: left;
          }
          &:nth-child(2) {
            width: 168px;
            flex: none;
            text-align: left;
          }
        }
        .head-data {
          border-top: none;
          font-weight: bold;
          font-size: 12px;
        }
        .body-data {
          font-size: 14px;
          &:nth-child(n + 3) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }

  .pack {
    display: ${props => (props.isMobile ? 'none' : 'inline')};
  }
  .uppercase {
    text-transform: uppercase;
  }
  .dot {
    display: inline-block;
    background: var(--bazeblue);
    width: ${props => (props.isMobile ? '6px' : '10px')};
    height: ${props => (props.isMobile ? '6px' : '10px')};
    margin: 2px;
    border-radius: 50%;
  }
  img {
    display: block;
    height: 40px;
    width: auto;
  }

  svg {
    margin-left: 3px;
  }
`
