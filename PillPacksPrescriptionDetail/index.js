import React from 'react'
import { Header, Container, Grid, Icon } from 'semantic-ui-react'
import { sentence } from 'case'
import get from 'lodash/get'
import i18n from 'i18n'

import PillPackImage from 'components/PillPacks/PillPackImage'
import EvaluationNote from 'components/EvaluationNote'
import DatesSelector from 'components/DatesSelector'

import ChevRightGrayImg from '../../../assets/chev_right_gray@3x.png'
import ResultIcon from './images/icon.svg'

import './index.css'

export const PillPacksPrescriptionDetail = ({
  pillPackPrescription,
  relatedBiomarkersReports,
  date,
  onDateChange,
  onPillDateChange
}) => {
  const pillPackPrescriptionImageUrl = get(pillPackPrescription, 'assets.0.url')

  let currentDate = date
  if (!currentDate) {
    currentDate = new Date(
      Math.max.apply(
        null,
        Object.values(relatedBiomarkersReports).map(r => r[0].date)
      )
    )
  }

  const biomarkersMeasurements = Object.values(relatedBiomarkersReports).find(
    b => b[0].date.getTime() === currentDate.getTime()
  )

  const reportDates = Object.values(relatedBiomarkersReports).map(
    b => b[0].date
  )

  const renderlabResult = measurement => {
    return (
      <div
        className="lab-result"
        key={measurement.date}
        onClick={() => onDateChange(measurement.id, measurement.date)}
      >
        <div className="left">
          <img
            className="result-icon"
            src={ResultIcon}
            alt={measurement.name}
          />
          <div>
            <p>
              <Icon
                name="circle"
                size="small"
                style={{ color: measurement.assessmentConfig.color }}
              />
              {measurement.name}
            </p>
            <p className="value">{`${measurement.measured.value} ${measurement.measured.unit}`}</p>
          </div>
        </div>
        <div className="right">
          <img
            className="chevron"
            src={ChevRightGrayImg}
            alt={measurement.name}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="pillpack-container">
      <div>
        <Container textAlign="center">
          <Header
            as="h2"
            textAlign="left"
            className="PillPackOverview__main-header"
          >
            <Header.Content>{pillPackPrescription.name}</Header.Content>
          </Header>

          {reportDates.length > 1 && (
            <DatesSelector
              dates={reportDates}
              selectedDate={currentDate}
              onChange={onPillDateChange}
            />
          )}
        </Container>

        <Grid
          className="pillpack-container"
          columns="equal"
          centered
          padded
          stackable
        >
          <Grid.Row>
            <Grid.Column>
              <div className="pillpack-subcontainer info-subcontainer">
                <PillPackImage
                  imageSrc={pillPackPrescriptionImageUrl}
                  title={pillPackPrescription.name}
                  ellipse={false}
                  transparentBg={true}
                />
                <div className="info-text">
                  <p>{pillPackPrescription.info}</p>
                  <br />
                  <p>
                    <span style={{ fontWeight: '700' }}>
                      {i18n.t(
                        'PillPacks.PillPacksPrescriptionDetail.facts.pillType.title'
                      )}
                      :
                    </span>
                    {` `}
                    {sentence(pillPackPrescription.type)}
                  </p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            {biomarkersMeasurements && biomarkersMeasurements.length > 0 && (
              <Grid.Column>
                <div className="pillpack-subcontainer">
                  <Header as="h4">
                    {i18n.t(
                      'PillPacks.PillPacksPrescriptionDetail.labResults.title'
                    )}
                  </Header>

                  <div className="lab-container">
                    {biomarkersMeasurements.map(bm => renderlabResult(bm))}
                  </div>
                </div>
              </Grid.Column>
            )}

            <Grid.Column>
              <div className="pillpack-subcontainer">
                <Header as="h4">
                  {i18n.t(
                    'PillPacks.PillPacksPrescriptionDetail.ingredients.title'
                  )}
                </Header>

                <Header as="h5">
                  {i18n.t(
                    'PillPacks.PillPacksPrescriptionDetail.ingredients.contains'
                  )}
                  :
                </Header>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {pillPackPrescription.relevantIngredients.map(
                      ({ name, dosage, unit }) => (
                        <li key={name}>{`${dosage} ${unit} ${name}`}</li>
                      )
                    )}
                </ul>
              </div>
            </Grid.Column>

            {/* Add an empty column in case no measurements are available, so that ingredients stay on 1 column */}
            {biomarkersMeasurements && biomarkersMeasurements.length === 0 ? <Grid.Column /> : null}
          </Grid.Row>
        </Grid>

        <EvaluationNote />
      </div>
    </div>
  )
}

PillPacksPrescriptionDetail.displayName = 'PillPacksPrescriptionDetail'

export default PillPacksPrescriptionDetail
