import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'

import Prescription from './Prescription'

storiesOf('Prescription', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Prescription
      style={{ margin: 30, maxWidth: 200 }}
      title={text('title', 'Omega-3')}
      description={text('description', '2 x 800 mg')}
      imageSrc="https://sanalytica-assets.storage.googleapis.com/assets/supplements/1621_Omega-3/image.jpg"
    />
  ))
