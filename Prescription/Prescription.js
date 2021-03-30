import React from 'react'
import Colors from 'config/Colors'

import PillPackImage from '../PillPackImage'

const styles = {
  container: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '5px',
    userSelect: 'none'
  },
  body: {
    padding: '1.2em',
    fontSize: '1em',
    color: Colors.textDark
  },
  title: {
    marginBottom: 5
  }
}

export const Prescription = ({ imageSrc, title, description, style }) => (
  <div style={{ ...styles.container, ...style }}>
    <PillPackImage imageSrc={imageSrc} title={title} />
    <div style={styles.body}>
      <h3 style={styles.title}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
)

Prescription.displayName = 'Prescription'

export default Prescription
