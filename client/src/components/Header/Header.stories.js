import { h } from 'preact'

import Header from '.'

export default {
  title: 'Header',
  component: Header,
}

export const Heading = () => <Header />
export const WithArrow = () => <Header showArrow />
export const WithMenu = () => <Header showMenu />
