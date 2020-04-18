import { h } from 'preact'
import { action } from '@storybook/addon-actions'

import FAB from '.'

export default {
  title: 'FAB',
  component: FAB,
}

export const Default = () => <FAB onClick={action('Clicked FAB')} />
