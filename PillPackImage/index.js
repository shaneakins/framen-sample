import React from 'react'

export const PillPackImagesVersion = 3
export const PlaceholderSupplementImg = `https://sanalytica-assets.storage.googleapis.com/assets/supplements/Supplement-Image-Not-Found.png`

export const PillPackImage = ({ imageSrc, title, ellipse, transparentBg }) => {
  
  const styles = {
    imageContainer: {
    },
    image: {
      width: '100%'
    }
  }

  return (
    <div className="pp-image-container" style={styles.imageContainer}>
      <img
        className="pill-pack-image"
        style={styles.image}
        src={
          (imageSrc || PlaceholderSupplementImg) + `?v=${PillPackImagesVersion}`
        }
        alt={title}
        onError={e => {
          e.target.src =
            PlaceholderSupplementImg + `?v=${PillPackImagesVersion}`
        }}
      />
    </div>
  )
}

PillPackImage.displayName = 'PillPackImage'
PillPackImage.defaultProps = {
  ellipse: true,
  transparentBg: false
}

export default PillPackImage
