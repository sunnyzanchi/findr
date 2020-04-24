import { h } from 'preact'
import { action } from '@storybook/addon-actions'

import Header from '.'

export default {
  title: 'Header',
  component: Header,
}

export const Default = () => <Header />
export const WithArrow = () => (
  <Header onArrow={action('Clicked arrow')} showArrow />
)
export const WithMenu = () => (
  <Header onMenu={action('Clicked menu')} showMenu />
)
