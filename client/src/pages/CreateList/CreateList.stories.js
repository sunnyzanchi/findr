import { h } from 'preact'
import { action } from '@storybook/addon-actions'

import CreateList from '.'

export default {
  title: 'CreateList',
  component: CreateList,
}

export const Default = () => (
  <CreateList onBack={action('Clicked back')} onSave={action('Saved')} />
)
