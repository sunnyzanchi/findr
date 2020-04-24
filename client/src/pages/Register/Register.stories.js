import { h } from 'preact'
import { action } from '@storybook/addon-actions'

import Register from '.'

export default {
  title: 'Register',
  component: Register,
}

export const Default = () => <Register onSubmit={action('Form submitted')} />
