import React from 'react'
import { Link } from 'react-router-dom'
import { pillPacksPrescriptionUrl } from 'routes/Helper'
import Prescription from 'components/PillPacks/Prescription'
import get from 'lodash/get'

import './index.css'

export const PillPack = ({ pillPack: { prescriptions }, responsive }) => {
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, ${
        responsive.isMobile ? '165px' : '180px'
      })`,
      gridGap: '2rem 1rem',
      justifyContent: 'center'
    }
  }

  return (
    <div style={styles.grid} className="pillpacks-grid">
      {prescriptions.map(({ assets, name, shortDescription, id }) => (
        <Link to={pillPacksPrescriptionUrl(id)} key={id}>
          <Prescription
            imageSrc={get(assets, '0.url')}
            title={name}
            description={shortDescription}
          />
        </Link>
      ))}
    </div>
  )
}

PillPack.displayName = 'PillPack'

export default PillPack
