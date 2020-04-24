import { addParameters } from '@storybook/preact'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import '../node_modules/reset-css/reset.css'
import '../src/index.scss'

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
})
