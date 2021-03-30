import React from 'react'

import i18n from 'i18n'
import './index.css'

const DoctorRecommendationText = () => {
  return (
    <div className="DoctorRecommendationText">
      <p>
        {i18n.t('PillPacks.DoctorRecommendationText.para1')}
      </p>
      <p>
        {i18n.t('PillPacks.DoctorRecommendationText.para2')}
      </p>
      <p>
        {i18n.t('PillPacks.DoctorRecommendationText.para3')}
      </p>
    </div>
  )
}

export default DoctorRecommendationText
